const { Pool } = require("pg");

const pool = new Pool({
  user: "manan",
  host: "localhost",
  database: "trial_db",
  port: 5432,
});

async function createTableAndInsertValue() {
  try {
    // Create a users table
    await pool.query(`
          CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL
          );
        `);

    // Insert values into the users table
    await pool.query(`
          INSERT INTO users (username, email) VALUES 
            ('john_doe', 'john@example.com'),
            ('jane_doe', 'jane@example.com');
        `);

    console.log("Table created and values inserted successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection pool (optional)
    await pool.end();
  }
}

createTableAndInsertValue();
