import express from 'express';
const router = express.Router();    


import apiController from '../controller/apiController';
import userApiController from '../controller/userApiController';
import groupController from '../controller/groupController ';

const initApiRouters = (app)=>{
    
    router.get('/test-api',apiController.testApi);
    router.post('/register-api',apiController.registerApi);
    router.post('/login',apiController.loginApi);

    router.get('/user/read',userApiController.readFunc);
    router.post('/user/create',userApiController.createFunc);
    router.put('/user/edit',userApiController.editFunc);
    router.delete('/user/delete',userApiController.deleteFunc);

    router.get('/group/read',groupController.getGroup)
    

    return app.use('/api/v1/', router);
}
export default initApiRouters;