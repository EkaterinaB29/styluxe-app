const mysql = require('mysql2')

const conn = mysql.createConnection({
  host:process.env.DB_HOST,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:'SISIII2024_89221049'
})


const connectDB = async () => {
  conn.connect((err) => {
    if (err) {
      console.log(`Error ${err.message}`)
      process.exit(1)
    }
    console.log(`Database connected`.cyan.underline)
  }) 
}

module.exports = connectDB




