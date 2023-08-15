import express from 'express';
import dotenv from 'dotenv';
import alquiler from './assets/routers/alquiler.js';
import {JWT, JWTVerify} from "./assets/controller/jwt.js";

dotenv.config();

let appExpress = express();
appExpress.use(express.json());


//Routers
appExpress.use("/alquiler", JWTVerify, alquiler);
appExpress.use("/token", JWT);

appExpress.use("/",(req,res)=>{
    res.json({status:"404",message:"Hola Crack, te cuento que no haz establecido una ruta."})
})

//Configuracion del servidor para levantarlo
let config = JSON.parse(process.env.MY_SERVER)
appExpress.listen(config, ()=>{
    console.log(`http://${config.hostname}:${config.port}`)
})