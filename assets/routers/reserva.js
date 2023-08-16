import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
import {appMiddlewareReservaVerify} from "../middleware/reservaVerify.js";

const appRerserva = express();

appRerserva.use(express.json())
appRerserva.use(limitApi())
appRerserva.use(appMiddlewareReservaVerify)

appRerserva.get("/pendiente", async (req,res)=>{
    let db = await conx();
    let reserva = db.collection("reserva");

    let query = [
        {
            $lookup: {
              from: "automovil",
              localField: "ID_Automovil",
              foreignField: "ID_Automovil",
              as: "dataAutomovil"
            }
        },
        {
            $lookup:{
                from: "cliente",
                localField:"ID_Cliente",
                foreignField:"ID_Cliente",
                as:"dataCliente"
            }
        },
        {
            $project: {
                "_id":0,
                "dataAutomovil._id":0,
                "dataCliente._id":0,
            }
        },
        {
            $match: {
                "Estado":{$eq: "Pendientes"}
            }
        }
    ];
    
    let result = await reserva.aggregate(query).toArray();
    res.send(result);
})

appRerserva.get("/cliente/:idCliente", async (req,res)=>{
    let db = await conx();
    let idCliente = req.params.idCliente;
    let reserva = db.collection("reserva");
    let result = await reserva.find({ID_Cliente: parseInt(idCliente), Estado: "Pendientes"}).toArray();
    res.send(result);
})

export default appRerserva;