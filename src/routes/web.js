import express from 'express';
const router = express.Router();    

import homeController from '../controller/homeController'

const initWebRouters = (app)=>{
    router.get('/', homeController.handleHelloWorld);
    router.get('/user', homeController.handleUser);
    router.post('/users/update-user', homeController.handleUpdateUser);
    router.post('/users/create-user', homeController.handleCreateUser);
    router.post('/delete_user/:id', homeController.handleDeleteUser);
    router.get('/update_user/:id', homeController.getUpdate);

    return app.use('/', router);
}
export default initWebRouters;