import userService from '../service/userService'

const handleHelloWorld=(req,res)=>{
    res.render('home')
}
const handleUser=async(req,res)=>{
    
    const user =await userService.getListUser();
   
    return res.render('user',{user});
}
const handleCreateUser=async(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let username= req.body.username;
    
    await userService.createNewUser(email,password,username);
    
    

    return res.redirect('/user');
}
const handleDeleteUser=async(req,res)=>{
    await userService.deleteUser(req.params.id);
    return res.redirect('/user');
}
const getUpdate=async(req,res)=>{
    const userUpdate=await userService.getUserUpdate(req.params.id);
    return res.render('user-update',{userUpdate}); // khi truyền giá trị vào luôn nhớ {} thì mới nhận được 

}
const handleUpdateUser =async(req,res)=>{
    const id=req.body.id;
    const email =req.body.email;
    const username=req.body.username;
    await userService.updateUser(id,email,username);
    return res.redirect('/user');

}
module.exports={
    handleHelloWorld,handleUser,handleCreateUser,handleDeleteUser,getUpdate,handleUpdateUser
}