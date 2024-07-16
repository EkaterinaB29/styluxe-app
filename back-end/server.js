const express = require('express')
const path = require('path') 
const dotenv = require('dotenv').config() // Import the dotenv module
const bodyParser = require('body-parser'); // Import the body-parser
const userRoutes = require('./routes/userRoutes'); // Import the routes
const reviewRoutes = require('./routes/reviewRoutes'); // Import the routes
const postRoutes = require('./routes/postRoutes');  // Import post routes
const commentRoutes = require('./routes/commentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const messageRoutes = require('./routes/messageRoutes');

const transactionRoutes = require('./routes/transactionRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');


// Define the port
const port = 8211;
const app = express()
const db = require('./config/db'); // Import the database connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/post', postRoutes);  // Add post routes
app.use('/api/comment', commentRoutes);  
app.use('/api/reports', reportRoutes);
app.use('/api/messages', messageRoutes);

app.use('/api/transaction', transactionRoutes);

app.use(errorHandler);
// Add a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});
/// App listening on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

