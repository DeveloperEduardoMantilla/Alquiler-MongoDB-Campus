import { plainToClass, classToPlain } from "class-transformer";
import dotenv from "dotenv";
import {Router} from "express";
import {SignJWT, jwtVerify} from 'jose';
import {Alquiler} from "./../controllerDTO/alquiler.js";
import {Cliente} from "./../controllerDTO/cliente.js";

dotenv.config("../");
const JWT = Router();
const JWTVerify = Router();

const DTO = (p1) =>{
    const match = {
        'Alquiler': Alquiler,
        'Cliente' : Cliente
    };  
    const instan = match[p1];
    if(!instan) throw {status:404, message:"Token solicitado no es valido :/"}
    return {atributos: plainToClass(instan, {},{ ignoreDecorators:true }), class: instan}  
};

JWT.use('/:collection', async(req,res)=>{
    try{
        let instan = DTO(req.params.collection).atributos;
        const enconder = new TextEncoder();
        const jwtConstructor = new SignJWT(Object.assign({},classToPlain(instan)));
        const jwt = await jwtConstructor
        .setProtectedHeader({alg:"HS256", tp:"JWT"})
        .setIssuedAt()
        .setExpirationTime("1h")
        .sign(enconder.encode(process.env.JWT_PRIVATE_KEY));
        req.data = jwt;
        res.status(201).send({status:201, message: jwt});
    }catch(e){
        res.status(404).send({status:404, message: e.message})
    }
});

JWTVerify.use('/', async(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization) return res.status(400).send({status:400,message:"No se encontro token"});
    try{
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );
        req.data = jwtData;
        next();
    }catch(e){
        res.status(498).send({status:498, message:"Token caducado"});
    }
})

export {
    JWT, 
    JWTVerify
}