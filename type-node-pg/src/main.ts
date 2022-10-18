import dotenv from 'dotenv';
import PostgresPool from './db/postgres.pool';

// Load Environment Variables
dotenv.config({ path: __dirname + '/config/config.env' });

const poolConfig = {
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

const pool = new PostgresPool(poolConfig);

async function getAllEmployees(): Promise<any> {
  const sql = `SELECT *
    FROM employees
    WHERE employees.is_active = true`;

  const client = await pool.connect();

  try {
    const query_results = await client.query(sql);
    return {
      success: true,
      data: query_results.rows,
    }
  } catch (err: any) {
    console.log(err.stack)
  } finally {
    client.release()
  }
}

(async () => {

  let results = await getAllEmployees();
  console.log(results);

  await pool.end();

})();
