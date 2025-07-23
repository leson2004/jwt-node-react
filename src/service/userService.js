import bcrypt from "bcryptjs";
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
  port: '3307'
})
const hashPassword=(userPassword)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}
const createNewUser=(email,password,username)=>{
    const hashPass=hashPassword(password);
    connection.query('INSERT INTO users (email,password,username)VALUES (?,?,?)',[email,hashPass,username], 
        (err, rows, fields) => {
            if (err) throw err
        }
    )
}
const getListUser=()=>{
    connection.query('select * from users ', 
        (err, rows, fields) => {
            console.log(rows);
        }
    )
}
module.exports={
    createNewUser,getListUser
}