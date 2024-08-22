"use server";
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

import updateData from "./updateData";

export async function uploadFile(formData) {
    const file = formData.get("file");
    if (!(file instanceof File)) {
        throw new Error("Invalid file");
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // if the uploads folder doesn't exist, create it
    try {
        await fs.mkdir("./public/uploads");
    } catch (error) {
        if (error.code !== "EEXIST") {
            throw error;
        }
    }

    await fs.writeFile(`./public/uploads/${file.name}`, buffer);

    revalidatePath("/");

    return updateData();
}