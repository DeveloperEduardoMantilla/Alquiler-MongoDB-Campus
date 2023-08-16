import { Expose, Transform  } from "class-transformer";
import { IsDefined } from "class-validator";

export class dtoAlquiler{
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
    Costo_Total:number;

    @Expose({name:'estado'})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El campo estado es obligatorio`}}})
    Estado:string;

    constructor(data: Partial<dtoAlquiler>){
        Object.assign(this, data);
        this.ID_Alquiler = 0;
        this.ID_Cliente = 0;
        this.ID_Automovil = 0;
        this.Fecha_Inicio = "0000-00-00";
        this.Fecha_Fin = "0000-00-00";
        this.Costo_Total = 0;
        this.Estado = "";
    }
}