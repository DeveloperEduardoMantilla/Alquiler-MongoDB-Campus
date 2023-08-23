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
              "idSucursal": "$_id",
              "cantidadAutomoviles":"$total_Automoviles"
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
  let query={
    projection:{
      _id:0,
      "idAutomovil":"$ID_Automovil",
      "marca":"$Marca",
      "modelo":"$Modelo",
      "año":"$Anio",
      "tipo":"$Tipo",
      "capacidad":"$Capacidad",
      "precioDiario":"$Precio_Diario",
     }
  }
  let result = await alquiler.find({ Capacidad: { $gte: 5 } }, query).toArray();
  res.send(result); 
})

appAutomovil.get("/ordenados", async(req,res)=>{
  let db = await conx();
  let automovil = db.collection("automovil");
  let query = [
    {
        $project:{
            "_id": 0,
            "idAutomovil":"$ID_Automovil",
            "marca":"$Marca",
            "modelo":"$Modelo",
            "año":"$Anio",
            "tipo":"$Tipo",
            "capacidad":"$Capacidad",
            "precioDiario":"$Precio_Diario"
        }
    },
    {
        $sort:{
            "Marca": 1,
            "Modelo": 1
        }
    }
  ];
  let result = await automovil.aggregate(query).toArray();
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
          "sucursal":"$Nombre",
          "direccion":"$Direccion",
          "totalAutomoviles":"$total_Automoviles"
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
          "idAutomovil":"$ID_Automovil",
          "marca":"$Marca",
          "modelo":"$Modelo",
          "año":"$Anio",
          "tipo":"$Tipo",
          "capacidad":"$Capacidad",
          "precioDiario":"$Precio_Diario",
          "alquilerId":{$first:["$data_Alquiler.ID_Alquiler"]},
          "alquilerIdCliente":{$first:["$data_Alquiler.ID_Cliente"]},
          "alquilerIdAutomovil":{$first:["$data_Alquiler.ID_Automovil"]},
          "alquilerFechaInicio":{$first:["$data_Alquiler.Fecha_Inicio"]},
          "alquilerFechaFin":{$first:["$data_Alquiler.Fecha_Fin"]},
          "alquilerCostoTotal":{$first:["$data_Alquiler.Costo_Total"]},
          "alquilerEstado":{$first:["$data_Alquiler.Estado"]}
        }
    }
  ];
  let result = await alquiler.aggregate(query).toArray();
  res.send(result); 
})

export default appAutomovil;