import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';


const storageAlquiler = express();
storageAlquiler.use(express.json())

storageAlquiler.get("/", limitApi, async (req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find({}).toArray();
    res.send(result);
})

export default storageAlquiler;