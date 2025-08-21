import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from "bcryptjs";
const { Op } = require('sequelize');



const checkEmailExit=async(emailUser)=>{
    const user = await db.User.findOne({
        where:{email:emailUser}
    })
    if(user){
        return true;
    }else{
        return false;
    }
}
const checkPhoneExit=async(phoneUser)=>{
    const user = await db.User.findOne({
        where:{phone:phoneUser}
    })
    if(user){
        return true;
    }else{
        return false;
    }
}
const hashPassword=(userPassword)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    return hash;
}
const createUser=async(rawUserData)=>{
    try{
        let checkEmail=await checkEmailExit(rawUserData.email);
        if(checkEmail===true){
            return{
                EM:'email is exited !',
                EC:1
            }
        }
        let checkPhone=await checkPhoneExit(rawUserData.phone);
        if(checkPhone===true){
            return{
                EM:'phone is exited !',
                EC:1
            }
        }
        let hashPass =hashPassword(rawUserData.password);
        await db.User.create(
            {
                email:rawUserData.email,
                password:hashPass,
                username:rawUserData.username,
                phone:rawUserData.phone
            }
        )
        return{
            EM:'A new user is created successfully',
            EC:0
        }

    }catch(e){
        console.log(e);
        return{
            EM:'something wrongs in service.... ',
            EC:-1
        }

    }
}
const userLogin =async(rawLoginData)=>{
    try{
        const checkLogin=await db.User.findOne({
            where: {
                [Op.or]: [{ email: rawLoginData.loginValue }, { phone: rawLoginData.loginValue }],
            },raw: true,
        });
        if(checkLogin){
            console.log('email or phone is correct.. ');
            const checkPass=bcrypt.compareSync(rawLoginData.loginPassword, checkLogin.password);
            if(checkPass){
                console.log('password is correct');
                return ({
                    EM:'User login successfully',
                    EC:0
                })
            }
    
        }
        console.log('password is incorrect');
        return {
                EM:'Your email address , phone number or password is incorrect ',
                EC:1
            };
    }catch(e){
        return{
            EM:'something wrongs in service.... ',
            EC:-1
        }
     }

 }

    


module.exports={createUser,userLogin,checkEmailExit,checkPhoneExit,hashPassword}