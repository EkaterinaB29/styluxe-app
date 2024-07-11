const express = require('express')
const path = require('path')
require('dotenv').config()
//
// Define the port
const port = 8211;

const connectDB = require('./config/dbConfig')

connectDB()

const app = express()

app.use(express.json())

app.listen(port, (err) => {
  if (err) console.log(err)
  console.log(`Server started on port ${port}`)
})