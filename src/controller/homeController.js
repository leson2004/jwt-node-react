const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'jwt',
  port: '3307'
})

const handleHelloWorld=(req,res)=>{
    res.render('home')
}
const handleUser=(req,res)=>{
     res.render('user')
}
const handleCreateUser=(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let username= req.body.username;
    connection.query('INSERT INTO users (email,password,username)VALUES (?,?,?)',[email,password,username], (err, rows, fields) => {
        if (err) throw err
        
    })
    res.send('create user');
}
module.exports={
    handleHelloWorld,handleUser,handleCreateUser
}