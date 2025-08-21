import bcrypt from "bcryptjs";
const mysql = require('mysql2/promise');
const bluebird = require('bluebird');
import db from '../models/index';
import { where } from "sequelize/lib/sequelize";


const hashPassword=(userPassword)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}
const createNewUser=async(email,password,username)=>{
    const hashPass=hashPassword(password);
    const user = await db.User.create({email,hashPass,username}); 
    return user;   
}
const getListUser=async()=>{
    
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
    const user = await db.User.findAll(
        { 
            where: {id: 1,},
            include: db.Group,
            raw:true,
            nest: true
        }
    );
    console.log('user........',user)
    return user;
}
const deleteUser=async(id)=>{
   await db.User.destroy({
  where: {id},
})
}   
const getUserUpdate=async(id)=>{
    let userUpdate={};
    const user=await db.User.findAll({ where: {
    id: id,
  }})
    //console.log('user',user);
    userUpdate=user[0].dataValues;// không nên dùng userUpdate=user[0].dataValues; bởi vì sau khi find sẽ trả về sequelize object (search : sequelize object to javascript ) 
    return userUpdate; 
}
const updateUser=async(id,email,username)=>{
    await db.User.update({email,username},{where:{ id:id}})
}
module.exports={
    createNewUser,getListUser,deleteUser,getUserUpdate,updateUser
}