// src/auth.ts
import { Lucia, Session, User } from "lucia";
import { cookies } from "next/headers";
import { unstable_cache } from "next/cache";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import pool from "./components/utils/db";

const adapter = new NodePostgresAdapter(pool, {
	user: 'auth_user',
	session: 'user_session',
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}

export const validateRequest = async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    return await cachedValidateRequest(sessionId);
};

const cachedValidateRequest = unstable_cache(
    async (sessionId: string | null): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch {}
        return result;
    }
);