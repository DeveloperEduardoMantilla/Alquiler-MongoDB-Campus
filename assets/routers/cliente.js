import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
const appCliente = express();

appCliente.get("/",limitApi(), async (req,res)=>{
    let db = await conx();
    let alquiler = db.collection("cliente");
    let query = {        
        projection: {
            _id:0,
            ID_Cliente:0
        }
    }
    let result = await alquiler.find({},query).toArray();
    res.send(result);
})

export default appCliente;