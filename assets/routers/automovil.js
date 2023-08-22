import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
import {appMiddlewareAutomovilVerify} from "../middleware/automovilVerify.js";

const appAutomovil = express();

appAutomovil.use(limitApi());
appAutomovil.use(appMiddlewareAutomovilVerify);

appAutomovil.get("/total", async(req,res)=>{
    let db = await conx();
    let alquiler = db.collection("sucursal");
    let query = [
        {
            $lookup: {
              from: "sucursal_automovil",
              localField: "ID_Sucursal",
              foreignField: "ID_Sucursal",
              as: "data_Sucursal"
            }
        },
        {
            $unwind: "$data_Sucursal"
        },
        {
            $group: {
              _id: "$data_Sucursal.ID_Sucursal",
              total_Automoviles: {$sum: "$data_Sucursal.Cantidad_Disponible"}
            }
        },
        {
            $project: {
              "_id": 0,
              "ID_Sucursal": "$_id",
              "Nombre": 1,
              "Total_Automoviles": "$total_Automoviles"
            }
        },
        { $sort: { ID_Sucursal: 1 } }
    ];
    let result = await alquiler.aggregate(query).toArray();
    res.send(result); 
})

appAutomovil.get("/capacidad", async(req,res)=>{
  let db = await conx();
  let alquiler = db.collection("automovil");
  let result = await alquiler.find({ Capacidad: { $gte: 5 } },{_id:0,}).toArray();
  res.send(result); 
})

appAutomovil.get("/ordenados", async(req,res)=>{
  let db = await conx();
  let alquiler = db.collection("automovil");
  let query = [
    {
        projection:{
            "_id": 0,
        }
    },
    {
        $sort:{
            "Marca": 1,
            "Modelo": 1
        }
    }
  ];
  let result = await alquiler.aggregate(query).toArray();
  res.send(result); 
})

appAutomovil.get("/sucursal", async(req,res)=>{
  let db = await conx();
  let alquiler = db.collection("sucursal");
  let query = [
    {
        $lookup: {
          from: "sucursal_automovil",
          localField: "ID_Sucursal",
          foreignField: "ID_Sucursal",
          as: "data_Automoviles"
        }
    },
    {
        $addFields: {
          "total_Automoviles": { $sum: "$data_Automoviles.Cantidad_Disponible" }
        }
    },
    {
        $project: {
          "_id": 0,
          "Telefono": 0,
          "data_Automoviles._id": 0,
          "data_Automoviles.ID_Sucursal": 0,
        }
    }
  ];
  let result = await alquiler.aggregate(query).toArray();
  res.send(result); 
})

appAutomovil.get("/capacidad/disponibles", async(req,res)=>{
  let db = await conx();
  let alquiler = db.collection("automovil");
  let query = [
    {
        $lookup: {
          from: "alquiler",
          localField: "ID_Automovil",
          foreignField: "ID_Automovil",
          as: "data_Alquiler"
        }
    },
    {
        $match: {
          "data_Alquiler.Estado":"Disponible",
          "Capacidad":{$gte: 5}
        }
    },
    {
        $project: {
          "_id":0,
          "data_Alquiler._id": 0,
          "data_Alquiler.ID_Automovil_id": 0
        }
    }
  ];
  let result = await alquiler.aggregate(query).toArray();
  res.send(result); 
})

export default appAutomovil;