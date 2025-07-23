import express from 'express';
const router = express.Router();    

import homeController from '../controller/homeController'

const initWebRouters = (app)=>{
    router.get('/', homeController.handleHelloWorld);
    router.get('/user', homeController.handleUser);
    router.post('/users/create-user', homeController.handleCreateUser);

    return app.use('/', router);
}
export default initWebRouters;