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

// GET route by ID
export async function getRouteById(id) {
  // Query DB and return matching record by id
  const queryText = "SELECT * FROM routes WHERE id =$1";
  // Pass query to DB
  const result = await pool.query(queryText, [id]);
  return result.rows[0];
}

// POST new route
export async function saveNewRoute(route) {
  //   console.log(route);
  //define SQL query for new route
  const queryText =
    "INSERT INTO routes (route_name, route_data) VALUES ($1, $2) RETURNING *";
  // take values from req body
  const values = [route.name, route.data];
  //Send query to DB
  const result = await pool.query(queryText, values);
  // return result (newly added route)
  return result.rows[0];
}

// DELETE route
export async function deleteRoute(id) {
  // DELETE FROM routes WHERE id = 2
  const queryText = "DELETE FROM routes WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0];
}
