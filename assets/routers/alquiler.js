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
    let result = await alquiler.find({},{
        projection : {
            "_id":0,
            "id_alquiler":"$ID_Alquiler",
            "id_cliente":"$ID_Cliente",
            "id_automovil":"$ID_Automovil",
            "fecha_inicio":"$Fecha_Inicio",
            "fecha_fin":"$Fecha_Fin",
            "costo_total":"$Costo_Total",
            "estado":"$Estado"
        } 
    }).toArray();
    res.send(result);
})

appAlquiler.get("/detalles",  async(req,res)=>{
    let db = await conx();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find({Fecha_Inicio:'2023-07-05'},{projection:{
        "_id":0,
        "id_alquiler": "$ID_Alquiler",
        "id_cliente": "$ID_Cliente",
        "id_automovil": "$ID_Automovil",
        "fecha_inicio": "$Fecha_Inicio",
        "fecha_fin": "$Fecha_Fin",
        "costo_total": "$Costo_Total",
        "estado": "$Estado"
    }}).toArray();
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
            $project:{
                "_id":0,
                "id_alquiler": "$ID_Alquiler",
                "id_cliente": "$ID_Cliente",
                "id_automovil": "$ID_Automovil",
                "fecha_inicio": "$Fecha_Inicio",
                "fecha_fin": "$Fecha_Fin",
                "costo_total": "$Costo_Total",
                "estado": "$Estado"
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
                "id_alquiler":"$ID_Alquiler",
                "id_automovil":"$ID_Automovil",
                "fecha_inicio":"$Fecha_Inicio",
                "fecha_fin":"$Fecha_Fin",
                "costo_total":"$Costo_Total",
                "cliente_id": { $first: ["$dataCliente.ID_Cliente"] },
                "cliente_nombre": { $first: ["$dataCliente.Nombre"] },
                "cliente_apellido": { $first: ["$dataCliente.Apellido"] }
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
            $project:{
                "_id":0,
                "id_alquiler": "$ID_Alquiler",
                "id_cliente": "$ID_Cliente",
                "id_automovil": "$ID_Automovil",
                "fecha_inicio": "$Fecha_Inicio",
                "fecha_fin": "$Fecha_Fin",
                "costo_total": "$Costo_Total",
                "estado": "$Estado"
            }
        },
        {
            $match: {
                "id_alquiler": parseInt(idAlquiler)
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
    let result = await alquiler.find({ID_Alquiler: parseInt(idAlquiler)},{projection:{_id:0, "id_alquiler":"$ID_Alquiler", "costo_total":"$Costo_Total"}}).toArray();
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
        { 
        $project:{
            "_id":0,
            "id_alquiler": "$ID_Alquiler",
            "id_cliente": "$ID_Cliente",
            "id_automovil": "$ID_Automovil",
            "fecha_inicio": "$Fecha_Inicio",
            "fecha_fin": "$Fecha_Fin",
            "costo_total": "$Costo_Total",
            "estado": "$Estado"
        }
    },
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