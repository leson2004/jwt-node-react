import bcrypt from "bcryptjs";

import db from '../models/index';
import{checkEmailExit,hashPassword,checkPhoneExit} from './apiService'



const getAllUser=async()=>{
   try {
    const user = await db.User.findAll({
            attributes: ['id','email', 'username', 'address','phone'],
            include:{model:db.Group,attributes: ['name', 'description']},

    })
    if(user){
        return{
            EM:'Get user successfully 1',
            EC:0,
            DT:user
        }
    }else{
        return{
            EM:'Get user successfully',
            EC:0,
            DT:[]
        }
    }
    
    
   } catch (error) {
     console.log(error);
        return{
            EM:'something wrongs in service.... ',
            EC:-1,
            DT:[]
        }
   }
}
const createNewUser=async(data)=>{
    try {
        const checkEmail = await checkEmailExit(data.email);
        if(!checkEmail){
            return {
                EM:'this email has exit',
                EC:'1',
                DT:''
            }
        }
        const checkPhone=await checkPhoneExit(data.phone);
        if(!checkPhone){
            return {
                EM:'this number phone has exit',
                EC:'1',
                DT:''
            }
        }
        if(checkEmail===true&&checkPhone===true){
            const hashPassword= await hashPassword(data.password);
            await db.User.create({data});
            return {
                EM:'creating new user is successful ',
                EC:'0',
                DT:''
            }
        }
    } catch (error) {
        console.log(error);
        return {
            EM:'something wrongs in service.... ',
            EC:'-1',
            DT:''
        }
    }
}   

const updateUser=()=>{
    try {
        
    } catch (error) {
         console.log(error);
        return {
            EM:'something wrongs in service.... ',
            EC:'-1',
            DT:''
        }
    }
}   
const deleteUser=async(id)=>{
    try {
        // để xóa user cần check điều kiện xem có tồn tại không thì nên dùng findOne để trả ra 1 object của module 
        // nếu tồn tại cho xóa (success) 
        // nếu không thì báo user không tồn tại  
        let user = await db.User.findOne({
            where:{id}
        })
        if(user){
            await user.destroy();
            return{
                EM:'delete user successfully',
                EC:0,
                DT:[]
        }
        }else{
            return {
                EM:'user is not exit ',
                EC:1,
                DT:[]
            }
        }
    } catch (error) {
         console.log(error);
        return {
            EM:'something wrongs in service.... ',
            EC:-1,
            DT:''
        }
    }
}   
const getUserWithPagination=async(page,limit)=>{
    try {
        //console.log('p',page,'l',limit)
        let offset= (page -1)*limit;
        const { count, rows }=await db.User.findAndCountAll({
            attributes: ['id','email', 'username', 'address','phone'],
            include:{model:db.Group,attributes: ['name', 'description']},
            offset:offset,
            limit:limit
        })
        let totalPages=Math.ceil(count/limit)
        let data ={
            totalPages:totalPages,
            totalRows:count,
            users:rows

        }
       // console.log('of',offset,'a',totalPages);
        return{
            EM:'Get user successfully 0',
            EC:0,
            DT:data
        }
    } catch (error) {
        console.log(error);
        return {
            EM:'something wrongs in service.... ',
            EC:'-1',
            DT:''
        }
    }
}

module.exports={getAllUser,createNewUser,updateUser,deleteUser,getUserWithPagination}