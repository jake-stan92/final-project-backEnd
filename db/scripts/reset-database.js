import { pool } from "../index.js";
async function resetDatabase() {
  try {
    // Drop existing tables if they exist
    await pool.query(`
        DROP TABLE IF EXISTS routes CASCADE;
    `);

    // Create the routes table
    await pool.query(`
        CREATE TABLE routes (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            route_name VARCHAR(255) NOT NULL,
            route_data JSON
        );
    `);

    // Popualte routes table
    await pool.query(`
      INSERT INTO routes (route_name, route_data)
      VALUES 
        ('test_Route', '[{"lat": 123, "lng": 1234}]')
        `);

    // Validate script
    console.log("Database reset successful");
  } catch (error) {
    console.error("Database reset failed: ", error);
  } finally {
    // End the pool
    await pool.end();
  }
}

await resetDatabase();
