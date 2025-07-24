import bcrypt from "bcryptjs";
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');


const hashPassword=(userPassword)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}
const createNewUser=async(email,password,username)=>{
    const hashPass=hashPassword(password);
     const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    connection.query('INSERT INTO users (email,password,username)VALUES (?,?,?)',[email,hashPass,username], 
        (err, rows, fields) => {
            if (err) throw err
        }
    )
}
const getListUser=async()=>{
    let users =[];
    // connection.query('select * from users ', 
    //      (err, rows, fields) => {
    //         if(err){
    //             console.log(err)
    //             return users;
    //         }
    //         users=rows;
    //         return users;
    //     }
    // )
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    try{
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    users=rows;

    }catch{
        (err)=>{
            console.log(err)
        }
    }
    return users;
}
const deleteUser=async(id)=>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    try{
    const [rows, fields] = await connection.execute('DELETE FROM users where id=?',[id]);
    return rows;
    }catch{
        (err)=>{
            console.log(err)
        }
    }   
}   
const getUserUpdate=async(id)=>{
    let userUpdate=[];
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    try{
    const [rows, fields] = await connection.execute('SELECT id,email,username FROM users where id=?',[id]);
    console.log('row',rows);
    userUpdate= rows;
    }catch(err){     
    console.log(err)
    }  
    return userUpdate; 
}
const updateUser=async(id,email,username)=>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    await connection.execute("UPDATE users SET email = ?, username = ? WHERE id = ?",[email, username, id]);
}
module.exports={
    createNewUser,getListUser,deleteUser,getUserUpdate,updateUser
}