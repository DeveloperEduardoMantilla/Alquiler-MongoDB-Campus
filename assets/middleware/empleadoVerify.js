import "reflect-metadata";
import {classToPlain, plainToClass} from "class-transformer";
import {Router} from "express";
import {estructuraDto} from "../controller/jwt.js";

const appMiddlewareEmpleadoVerify = Router();

appMiddlewareEmpleadoVerify.use((req,res,next)=>{
    if(req.rateLimits) return;
    let {payload} = req.data;
    let {iat, exp, ...newPayload} = payload;
    payload = newPayload;
    let clone = JSON.stringify(classToPlain(plainToClass(estructuraDto("Empleado").class, {}, {ignoreDecorators:true})));
    let verify = clone === JSON.stringify(payload);
    (!verify) ?res.status(406).send({status:406, message:"Token no valido para (Empleado)"}) :next();
})

export{
    appMiddlewareEmpleadoVerify
}