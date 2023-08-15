import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';

const appAlquiler = express();
//Obtener los detalles del alquiler con el ID_Alquiler específico.

appAlquiler.use(express.json())

appAlquiler.get("/",limitApi(), async (req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find({}).toArray();
    res.send(result);
})

appAlquiler.get("/disponible",limitApi(), async (req,res)=>{
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

appAlquiler.get("/activos",limitApi(), async (req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");

    let query = [
        {
            $lookup: {
              from: "cliente",
              localField: "ID_Cliente",
              foreignField: "ID_Cliente",
              as: "dataCliente"
            }
        },
        {
            $match: {
              "Estado":{$eq: "Disponible"}
            }
        },
        {
            $project:{
                "_id":0,
                "Estado":0,
                "ID_Cliente":0,
                "dataCliente._id":0,
                "dataCliente.DNI":0,
                "dataCliente.Direccion":0,
                "dataCliente.Telefono":0,
                "dataCliente.Email":0
            }
        }
    ];
    
    let result = await alquiler.aggregate(query).toArray();
    res.send(result);
})

appAlquiler.get("/:idAlquiler", limitApi(), async(req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let idAlquiler = req.params.idAlquiler;
    let query = [
        {
            $project: {
                "_id":0
            }
        },
        {
            $match: {
                "ID_Alquiler": parseInt(idAlquiler)
            }
        }
    ]
    
    let result = await alquiler.aggregate(query).toArray();
    if(result.length==0){
        res.send({message:"No se encontraron registros"})
    }else{
        res.send(result);
    }
})


export default appAlquiler;