import db from "../models"

const getAllGroup=async()=>{
    try {
      const group=  await db.Group.findAll({attributes: ['id', 'name'], order:[['name','ASC']]});
      if(group){
         return {
            EM:'get group successful',
            EC:0,
            DT:group

        }
      }else{
         return {
            EM:'get group successful',
            EC:0,
            DT:[]

        }
      }
    } catch (error) {
        console.log(error);
        return {
            EM:'somethings error from service ',
            EC:-1,
            DT:[]

        }
    }
}
module.exports={getAllGroup}