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

storageAlquiler.get("/disponible",limitApi(), async (req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");

    let query = [
        {
            $match:{
                Estado:{$eq:"Disponible"}
            }
        },
        {
            $project: {
                "_id":0
            }
        }
    ];
    
    let result = await alquiler.aggregate(query).toArray();
    res.send(result);
})

export default storageAlquiler;