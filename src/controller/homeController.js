import userService from '../service/userService'

const handleHelloWorld=(req,res)=>{
    res.render('home')
}
const handleUser=(req,res)=>{
     res.render('user')
}
const handleCreateUser=(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let username= req.body.username;
    
    userService.createNewUser(email,password,username);
    

    return res.send('create user');
}
module.exports={
    handleHelloWorld,handleUser,handleCreateUser
}