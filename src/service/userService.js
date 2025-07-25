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
    connection.query('INSERT INTO user (email,password,username)VALUES (?,?,?)',[email,hashPass,username], 
        (err, rows, fields) => {
            if (err) throw err
        }
    )
}
const getListUser=async()=>{
    let user =[];
    // connection.query('select * from user ', 
    //      (err, rows, fields) => {
    //         if(err){
    //             console.log(err)
    //             return user;
    //         }
    //         user=rows;
    //         return user;
    //     }
    // )
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    try{
    const [rows, fields] = await connection.execute('SELECT * FROM user');
    user=rows;

    }catch{
        (err)=>{
            console.log(err)
        }
    }
    return user;
}
const deleteUser=async(id)=>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    try{
    const [rows, fields] = await connection.execute('DELETE FROM user where id=?',[id]);
    return rows;
    }catch{
        (err)=>{
            console.log(err)
        }
    }   
}   
const getUserUpdate=async(id)=>{
    let userUpdate={};
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'jwt',
        port: '3307', Promise: bluebird
    });
    try{
    const [rows, fields] = await connection.execute('SELECT * FROM user where id=?',[id]);
    userUpdate= rows[0];
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
    await connection.execute("UPDATE user SET email = ?, username = ? WHERE id = ?",[email, username, id]);
}
module.exports={
    createNewUser,getListUser,deleteUser,getUserUpdate,updateUser
}