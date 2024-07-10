require('dotenv').config()

const express = require('express')
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('hello'))

app.listen(port, () => console.log(`Server started on port ${port}`))