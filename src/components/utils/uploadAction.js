"use server";
import { updateDB } from "../utils/data";
import pool from "@/components/utils/db";

const names = ['H5N1_human_surveillance_data.csv', 'combined_h5n1_animal_surveillance_data.csv'];

export async function uploadFile(fd) {

  // fg is: FormData { [Symbol(state)]: [ { name: 'file', value: [File] } ] }
  const file = fd.get('file');
  const name = file.name;

  if (!names.includes(name)) {
    console.error('Invalid file');
    return;
  }

  // Read the file
  const r = file.stream().getReader();
  let buffer = new Uint8Array();
  while (true) {
    const { done, value } = await r.read();
    if (done) break;
    buffer = new Uint8Array([...buffer, ...value]);
  }

  // Save file to the database
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO files (name, data) VALUES ($1, $2)
       ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data`,
      [name, buffer]
    );
  } catch (error) {
    console.error('Error inserting file', error);
  } finally {
    client.release();
  }

  // update the database
  await updateDB();
  console.log('File uploaded');
}