import { con } from "../db/atlas.js";
import {Router} from "express";

const appAlquiler = Router();


appAlquiler.get("/", async(req, res) => {
    let db = await con();
    let alquiler = db.collection("alquiler");
    let result = await alquiler.find();
    res.send(result);
});

export default appAlquiler; 