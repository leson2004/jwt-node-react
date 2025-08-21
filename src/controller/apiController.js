import apiService from '../service/apiService'

const testApi=(req,res)=>{
    return res.send({
        "user":"username",
        "password":"124"

    })
}
const registerApi=async(req,res)=>{
    try{
        if(!req.body.email || !req.body.phone ||!req.body.username ||!req.body.password){
           return res.status(400).json({
            EM:'Missing require parameters',
            EC:'1',
            DT:''
           })
        }
        //service 
        const data =await apiService.createUser(req.body);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:''

        })
    }catch(e){
        return res.status(500).json({
            EM:'error from sever ',
            EC:'-1',
            DT:''
        })

    }
    

}
const loginApi=async(req,res)=>{
    try{
        
        //service 
        const data =await apiService.userLogin(req.body);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:''

        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            EM:'error from sever ',
            EC:'-1',
            DT:''
        })

    }
}


module.exports={
    testApi,registerApi,loginApi
}