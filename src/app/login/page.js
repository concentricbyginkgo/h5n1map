import pool from "@/components/utils/db";
import { verify, hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {

	// const password = "definitelyADefiantPassword";

	// console.log(await hash(password {
	// 	// recommended minimum parameters
	// 	memoryCost: 19456,
	// 	timeCost: 2,
	// 	outputLen: 32,
	// 	parallelism: 1
	// }));

	// log all the methods available in the pool object
	return (
		<div className='dynaPad dynaMargin fontXL borderBox login'>
			<h3>Sign in</h3>
			<form action={login}>
				<label htmlFor="username">Username</label>
				<input name="username" id="username" />
				<br />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<br />
				<button>Continue</button>
			</form>
		</div>
	);
}

async function login(formData) {
	"use server";
	const db = await pool.connect();
	const username = formData.get("username");
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}

	const existingUser = await db
		.query("SELECT * FROM auth_user WHERE username = $1", [username])
		.then((res) => res.rows[0]);
	if (!existingUser) {
		return {
			error: "Incorrect username or password"
		};
	}

	const validPassword = await verify(existingUser.password_hash, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1
	});
	if (!validPassword) {
		return {
			error: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/upload");
}