const express = require('express')
const path = require('path') 
const dotenv = require('dotenv').config() // Import the dotenv module
const bodyParser = require('body-parser'); // Import the body-parser
const userRoutes = require('./routes/userRoutes'); // Import the routes
const reviewRoutes = require('./routes/reviewRoutes'); // Import the routes
const postRoutes = require('./routes/postRoutes');  // Import post routes
const commentRoutes = require('./routes/commentRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// Define the port
const port = 8211;
const app = express()
const db = require('./config/db'); // Import the database connection
// Serve static files from the uploads directory
app.use(bodyParser.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'uploads' directory
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/post', postRoutes);  // Add post routes
app.use('/api/comment', commentRoutes);  


// Add a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
/// App listening on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

