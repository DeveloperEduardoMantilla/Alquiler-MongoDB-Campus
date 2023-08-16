import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
import {appMiddlewareAlquilerVerify} from "../middleware/alquilerVerify.js";

const appAlquiler = express();

appAlquiler.use(express.json());
appAlquiler.use(limitApi());
appAlquiler.use(appMiddlewareAlquilerVerify);

appAlquiler.get("/", async (req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find({}).toArray();
    res.send(result);
})

appAlquiler.get("/detalles",  async(req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find({Fecha_Inicio:'2023-07-05'},{_id:0}).toArray();
    res.send(result);
})

appAlquiler.get("/disponible", async (req,res)=>{
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

appAlquiler.get("/total", async (req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.countDocuments();
    res.send({"message":"Cantidad de almacenes registrados "+result});
})

appAlquiler.get("/activos", async (req,res)=>{
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

appAlquiler.get("/:idAlquiler",  async(req,res)=>{
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

appAlquiler.get("/costoTotal/:idAlquiler",  async(req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let idAlquiler = req.params.idAlquiler;
    let result = await alquiler.find({ID_Alquiler: parseInt(idAlquiler)},{projection:{_id:0, ID_Alquiler:1, Costo_Total:1}}).toArray();
    if(result.length==0){
        res.send({message:"No se encontraron registros"})
    }else{
        res.send(result);
    }
})

appAlquiler.get("/alquileres/filtroFecha",  async(req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    
    let query = [
        {
            $match: {
                Fecha_Inicio: {
                    $gte: "2023-07-05",
                    $lte: "2023-07-10"
                }
            }
        },
        { $project: {"_id":0} },
        { $sort: {Fecha_Inicio: 1}}
    ];

    let result = await alquiler.aggregate(query).toArray();
    if(result.length==0){
        res.send({message:"No se encontraron registros"})
    }else{
        res.send(result);
    }
})

export default appAlquiler;