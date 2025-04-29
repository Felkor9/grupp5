const mysql=require('mysql2')
const connectionMySQL=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'password',
  database:'reseplanerare'
})

module.exports=connectionMySQL
