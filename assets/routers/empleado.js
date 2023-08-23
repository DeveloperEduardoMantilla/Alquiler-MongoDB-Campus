import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
import {appMiddlewareEmpleadoVerify} from "../middleware/empleadoVerify.js";

const appEmpleado = express();

appEmpleado.use(express.json())
appEmpleado.use(limitApi());
appEmpleado.use(appMiddlewareEmpleadoVerify);

appEmpleado.get("/vendedor", async (req,res)=>{
    let db = await conx();
    let empleado = db.collection("empleado");

    let query = [
        {
            $project: {
              "_id":0
            }
        },
        {
            $match: {
                "Cargo":"Vendedor"
            }
        },
        {
            $project:{
                "idEmpleado":"$ID_Empleado",
                "nombre":"$Nombre",
                "apellido":"$Apellido",
                "dni":"$DNI",
                "direccion":"$Direccion",
                "telefono":"$Telefono",
                "cargo":"$Cargo",
            }
        }
    ];
    
    let result = await empleado.aggregate(query).toArray();
    res.send(result);
})

appEmpleado.get("/gerenteAsistente", limitApi(), async (req,res)=>{
    
    let db = await conx();
    let empleado = db.collection("empleado");
    let query={
        projection:{
            "_id":0,
            "idEmpleado":"$ID_Empleado",
            "nombre":"$Nombre",
            "apellido":"$Apellido",
            "dni":"$DNI",
            "direccion":"$Direccion",
            "telefono":"$Telefono",
            "cargo":"$Cargo"
        }
    }
    let result = await empleado.find({ Cargo:{ $in: ["Gerente", "Asistente"]}},query).toArray();
    res.send(result);
})

export default appEmpleado;