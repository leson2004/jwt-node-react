import {getAllGroup} from '../service/groupApiService'

const getGroup=async(req,res)=>{
    try {
        const data=await getAllGroup();
        return res.status(200).json({
                EM:data.EM,
                EC:data.EC,
                DT:data.DT
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
                EM:'something wrong from server',
                EC:-1,
                DT:''
        })
    }
}
module.exports={getGroup}