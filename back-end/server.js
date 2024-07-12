const express = require('express')
//const path = require('path') 
const dotenv = require('dotenv').config() // Import the dotenv module
const bodyParser = require('body-parser'); // Import the body-parser
const userRoutes = require('./routes/userRoutes'); // Import the routes


//
// Define the port
const port = 8211;
const app = express()
const db = require('./config/db'); // Import the database connection

app.use(bodyParser.json());
app.use('/api/user', userRoutes);


// Add a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
/// App listening on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

