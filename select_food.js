const express = require('express');
const sql = require('mssql');

const app = express();


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER_NAME + ".database.windows.net",
    database: process.env.DB_NAME,
    options: {
      encrypt: true, // For security
    },
  };

// Define API route
app.get('/foods', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Foods');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Microservice is running on port 3001');
});