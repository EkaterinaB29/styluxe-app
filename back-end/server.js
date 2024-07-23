import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // Import body-parser
import userRoutes from './routes/userRoutes.js'; // Import the routes
import reviewRoutes from './routes/reviewRoutes.js'; // Import the routes
import postRoutes from './routes/postRoutes.js';  // Import post routes
import commentRoutes from './routes/commentRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import orderRoutes from './routes/ordersRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import fetch from 'node-fetch';
import db from './config/db.js'; // Import the database connection
import cors from 'cors';
dotenv.config(); // Configure dotenv
// Define the port
const port = 8211;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/user', userRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/posts', postRoutes);  // Add post routes
app.use('/api/comment', commentRoutes);  
app.use('/api/reports', reportRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandler);

// Add a root route
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// App listening on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
