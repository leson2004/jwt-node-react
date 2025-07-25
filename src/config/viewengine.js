import express from 'express';


const configViewEngine= (app)=>{
    app.use(express.static('./src/public'));
    app.set('views', './src/views');
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
   
}
export default configViewEngine;