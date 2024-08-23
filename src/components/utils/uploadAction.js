"use server";
import { updateDB } from "../utils/data";
import pool from "@/components/utils/db";

const names = ['H5N1_human_surveillance_data.csv', 'combined_h5n1_animal_surveillance_data.csv'];

export async function uploadFile(fd, name) {
  try {
    // fg is: FormData { [Symbol(state)]: [ { name: 'file', value: [File] } ] }
    const file = fd.get('file');

    if (!names.includes(name)) {
      throw new Error('Invalid file');
    }

    // Read the file
    const r = file.stream().getReader();
    let buffer = new Uint8Array();
    while (true) {
      const { done, value } = await r.read();
      if (done) break;
      buffer = new Uint8Array([...buffer, ...value]);
    }

    // check the first three columns are correct
    const headers = new TextDecoder().decode(buffer).split(',').slice(0, 3).join(',');
    if (name == names[0] && headers != 'event,event_guid,disease') {
      return false;
    } else if (name == names[1] && headers != 'source,state,county') {
      return false;
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
    let res = await updateDB();
    return res;
  } catch (error) {
    console.error('Error uploading file', error);
    return false;
  }
  return false;
}