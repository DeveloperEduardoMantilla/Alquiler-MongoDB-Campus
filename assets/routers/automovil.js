import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
const appAutomovil = express();

appAutomovil.get("/total",limitApi(),  async(req,res)=>{
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

appAutomovil.get("/capacidad",limitApi(),  async(req,res)=>{
  let db = await conx();
  let alquiler = db.collection("automovil");
  let result = await alquiler.find({ Capacidad: { $gte: 5 } },{_id:0,}).toArray();
  res.send(result); 
})

appAutomovil.get("/ordenados",limitApi(),  async(req,res)=>{
  let db = await conx();
  let alquiler = db.collection("automovil");
  let query = [
    {
        $project:{
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

appAutomovil.get("/sucursal",limitApi(),  async(req,res)=>{
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

export default appAutomovil;