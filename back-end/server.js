const express = require('express')
const path = require('path')
require('dotenv').config()
//
// Define the port
const port = 8211;

const app = express()
const db = require('./config/db'); // Import the database connection

/// App listening on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

