import express from 'express';
const router = express.Router();    

const initWebRouters = (app)=>{
    router.get('/', (req, res) => {
        res.send('hello world alo')
    })
    return app.use('/', router);
}
export default initWebRouters;