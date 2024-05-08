import { pool } from "../db/index.js";
// GET a list of ALL saved routes
export async function getRoutes() {
  // query the db
  // return all results
  const queryText = "SELECT * FROM routes";
  // construct sql command
  const result = await pool.query(queryText);
  // send to db
  return result.rows;
}
