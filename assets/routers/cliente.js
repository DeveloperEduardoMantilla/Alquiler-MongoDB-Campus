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
    let cliente = db.collection("cliente");
    let query = {        
        projection: {
            _id:0, 
            "id_cliente":"$ID_Cliente", 
            "nombre":"$Nombre",
            "apellido":"$Apellido", 
            "dni":"$DNI",
            "direccion":"$Direccion", 
            "telefono":"$Telefono",
            "email":"$Email"
        }
    }
    let result = await cliente.find({DNI:dni},query).toArray();
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
                "_id":0,
                "idCliente":"$ID_Cliente",
                "nombre":"$Nombre",
                "apellido":"$Apellido",
                "dni":"$DNI",
                "direccion":"$Direccion",
                "alquilerId":{$first: ["$data_Alquiler.ID_Alquiler"]},
                "alquilerAutomovil":{$first: ["$data_Alquiler.ID_Automovil"]},
                "alquilerFechaInicio":{$first: ["$data_Alquiler.Fecha_Inicio"]},
                "alquilerFechaFin":{$first: ["$data_Alquiler.Fecha_Fin"]},
                "alquilerEstado": {$first: ["$data_Alquiler.Estado"]},
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
            "id_cliente":"$ID_Cliente", 
            "nombre":"$Nombre",
            "apellido":"$Apellido", 
            "dni":"$DNI",
            "direccion":"$Direccion", 
            "telefono":"$Telefono",
            "email":"$Email"
        }
    }
    let result = await alquiler.find({},query).toArray();
    res.send(result);
})

export default appCliente;