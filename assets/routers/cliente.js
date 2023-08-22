import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
import {appMiddlewareClienteVerify} from "../middleware/clienteVerify.js";

const appCliente = express();

appCliente.use(limitApi());
appCliente.use(appMiddlewareClienteVerify);
appCliente.get("/dniCliente/:id", async (req,res)=>{
    let db = await conx();
    let dni = req.params.id;
    let alquiler = db.collection("cliente");
    let query = [{
        DNI:dni
        },{
            $project:{
                _id:0, 
                "id_cliente":"$ID_Cliente", 
                "nombre":"$Nombre",
                "apellido":"$Apellido", 
                "dni":"$DNI", 
                "telefono":"$Telefono"
            }
        
        }]
    let result = await alquiler.find(...query).toArray();
    res.send(result);
})

appCliente.get("/alquiler", async (req,res)=>{
    let db = await conx();
    let query = [
        {
            $lookup: {
                from: "alquiler",
                localField: "ID_Cliente",
                foreignField: "ID_Cliente",
                as: "data_Alquiler"
            }
        },
        {
            $project: {
                "_id" : 0,
                "nuevaDireccion":0,
                "Telefono":0,
                "Email":0,
                "data_Alquiler._id":0,
                "data_Alquiler.ID_Cliente":0,
                "data_Alquiler.Costo_Total":0
            }
        },
        {
            $match: {
                data_Alquiler: { $ne: [] }
            }
        }
    ];

    let alquiler = db.collection("cliente");
    let result = await alquiler.aggregate(query).toArray();
    res.send(result);
})

appCliente.get("/", async (req,res)=>{
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