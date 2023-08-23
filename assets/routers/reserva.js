import express from "express";
import {conx} from '../db/atlas.js';
import {limitApi} from '../limit/limit.js';
import {appMiddlewareReservaVerify} from "../middleware/reservaVerify.js";

const appRerserva = express();

appRerserva.use(express.json())
appRerserva.use(limitApi())
appRerserva.use(appMiddlewareReservaVerify)

appRerserva.get("/pendiente", async (req,res)=>{
    let db = await conx();
    let reserva = db.collection("reserva");

    let query = [
        {
            $lookup: {
              from: "automovil",
              localField: "ID_Automovil",
              foreignField: "ID_Automovil",
              as: "dataAutomovil"
            }
        },
        {
            $lookup:{
                from: "cliente",
                localField:"ID_Cliente",
                foreignField:"ID_Cliente",
                as:"dataCliente"
            }
        },
        {
            $match: {
                "Estado":{$eq: "Pendientes"}
            }
        },
        {
            $project: {
                "_id":0,
                "idReserva":"$ID_Reserva",
                "idCliente":"$ID_Cliente",
                "idAutomovil":"$ID_Automovil",
                "fechaReserva":"$Fecha_Reserva",
                "fechaInicio":"$Fecha_Inicio",
                "fechaFin":"$Fecha_Fin",
                "estado":"$Estado",
                "automovilID":{$first:["$dataAutomovil.ID_Automovil"]},
                "automovilMarca":{$first:["$dataAutomovil.Marca"]},
                "automovilModelo": {$first:["$dataAutomovil.Modelo"]},
                "automovilAnio": {$first:["$dataAutomovil.Anio"]},
                "automovilTipo": {$first:["$dataAutomovil.Tipo"]},
                "automovilCapacidad": {$first:["$dataAutomovil.Capacidad"]},
                "automovilPrecioDiario": {$first:["$dataAutomovil.Precio_Diario"]},
                "clienteId":{$first:["$dataCliente.ID_Cliente"]},
                "clienteNombre":{$first:["$dataCliente.Nombre"]},
                "clienteDni":{$first:["$dataCliente.Apellido"]},
                "clienteDireccion":{$first:["$dataCliente.DNI"]},
                "clienteTelefono":{$first:["$dataCliente.Direccion"]},
                "clienteEmail":{$first:["$dataCliente.Telefono"]},
                "clienteId":{$first:["$dataCliente.Email"]}
            }
        }
    ];
    
    let result = await reserva.aggregate(query).toArray();
    res.send(result);
})

appRerserva.get("/cliente/:idCliente", async (req,res)=>{
    let db = await conx();
    let idCliente = req.params.idCliente;
    let reserva = db.collection("reserva");
    let query ={
        projection:{
            "_id":0,
            "idReserva":"$ID_Reserva",
            "idCliente":"$ID_Cliente",
            "idAutomovil":"$ID_Automovil",
            "fechaReserva":"$Fecha_Reserva",
            "fechaInicio":"$Fecha_Inicio",
            "fechaFIn":"$Fecha_Fin",
            "estado":"$Estado"
             }
    }
    let result = await reserva.find({ID_Cliente: parseInt(idCliente), Estado: "Pendientes"}, query).toArray();
    res.send(result);
})

export default appRerserva;