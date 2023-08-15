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

export default appAutomovil;