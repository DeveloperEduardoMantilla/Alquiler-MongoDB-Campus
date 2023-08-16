import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
const appCliente = express();


appCliente.get("/dniCliente/:id", limitApi(), async (req,res)=>{
    let db = await conx();
    let dni = req.params.id;
    let alquiler = db.collection("cliente");
    let result = await alquiler.find({DNI:dni},{_id:0, ID_Cliente:1, Nombre:1, Apellido:1, DNI:1, Telefono:1}).toArray();
    res.send(result);
})

appCliente.get("/alquiler", limitApi(), async (req,res)=>{
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