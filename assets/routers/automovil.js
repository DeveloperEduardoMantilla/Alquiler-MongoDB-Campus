import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
const appAutomovil = express();

appAutomovil.get("/", async (req,res)=>{
    res.send("Hola Mundo");
})

export default appAutomovil;