import dotenv from "dotenv";
import express from "express";
import alquiler from "./assets/routers/alquiler.js";
dotenv.config();

let appAlquiler = express();

appAlquiler.use(express.json());
appAlquiler.use("/alquiler",alquiler);
let config=JSON.parse(process.env.SERVER);

appAlquiler.listen(config,()=>{
    console.log(`http://${config.hostname}:${config.port}`);
});