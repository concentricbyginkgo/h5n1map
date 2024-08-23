import { Pool } from 'pg';

let connection = {
  user: process.env.DB_USER,
  host: process.env.DB_NAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};

const backup = {
  user: "PostUser",
  password: "GresPass",
  database: "db",
  port: "5432"
};

for (let key in connection) {
  if (!connection[key]) {
    connection[key] = backup[key];    
  }
}

const pool = new Pool(connection);

export default pool;