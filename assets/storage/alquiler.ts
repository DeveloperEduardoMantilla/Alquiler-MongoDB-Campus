import { Expose, Transform  } from "class-transformer";
import { IsDefined } from "class-validator";

export class Alquiler{
    @Expose({name:'id_alquiler'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo id_alquiler es obligatorio`}}})
    ID_Alquiler:number;

    @Expose({name:'id_cliente'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo id_cliente es obligatorio`}}})
    ID_Cliente:number;

    @Expose({name:'id_automovil'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo id_automovil es obligatorio`}}})
    ID_Automovil:number;

    @Expose({name:'fecha_inicio'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo fecha_inicio es obligatorio`}}})
    Fecha_Inicio:string;

    @Expose({name:'fecha_fin'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo fecha_fin es obligatorio`}}})
    Fecha_Fin:string;

    @Expose({name:'costo_total'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo costo_total es obligatorio`}}})
    Costo_Total:string;

    @Expose({name:'estado'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo estado es obligatorio`}}})
    Estado:string;
}