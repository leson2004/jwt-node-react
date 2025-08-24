import userApiService from '../service/userApiService'

const readFunc=async(req,res)=>{
    try {
        if(req.query.page&&req.query.limit){
            const page=req.query.page;
            const limit=req.query.limit;
            const data =await userApiService.getUserWithPagination(+page,+limit);
            return res.status(200).json({
                EM:data.EM,
                EC:data.EC,
                DT:data.DT

            })
        }else{
        const data =await userApiService.getAllUser();
            return res.status(200).json({
                EM:data.EM,
                EC:data.EC,
                DT:data.DT

            })
        }   
        // console.log('check req', req.query);
        // return res.status(200).json({

        //     DT:req.query
        // });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM:'error from sever ',
            EC:'-1',
            DT:''
        })
    }
}
const createFunc=async(req,res)=>{
    try {
        //check req( kiểm tra dữ liệu đầu vào )
        //console.log('req;',req.body);
        const data= await userApiService.createNewUser(req.body.data);
        
            return res.status(200).json({
                EM:data.EM,
                EC:data.EC,
                DT:data.DT
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM:'error from sever ',
            EC:'-1',
            DT:''
        })
    }
}
const editFunc=async(req,res)=>{
    try {
        const data = await userApiService.updateUser(req.body);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM:'error from sever ',
            EC:'-1',
            DT:''
        })
    }
}
const deleteFunc=async(req,res)=>{
    try {
        const id= req.body.id;
        console.log('id',id);
        const data = await userApiService.deleteUser(id);
        if(data){
            return res.status(200).json({
                EM:data.EM,
                EC:data.EC,
                DT:data.DT
            })
        }
        
    } catch (error) {
        console.log(e);
        return res.status(500).json({
            EM:'error from sever ',
            EC:'-1',
            DT:''
        })
    }
}
module.exports={readFunc,createFunc,editFunc,deleteFunc}