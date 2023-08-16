import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class dtoAutomovil{
    @Expose({name:'id_automovil'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo id_automovil es obligatorio.`}}})
    ID_Automovil:number;

    @Expose({name:'marca'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo marca es obligatorio.`}}})
    Marca:string;

    @Expose({name:'modelo'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo modelo es obligatorio.`}}})
    Modelo:string;

    @Expose({name:'anio'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo anio es obligatorio.`}}})
    Anio:number;

    @Expose({name:'tipo'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo tipo es obligatorio.`}}})
    Tipo:string;
    
    @Expose({name:'capacidad'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo capacidad es obligatorio.`}}})
    Capacidad:number;

    @Expose({name:'precio_diario'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo precio_diario es obligatorio.`}}})
    Precio_Diario:string;

    constructor(data: Partial<dtoAutomovil>){
        Object.assign(this, data);
        this.ID_Automovil = 0;
        this.Marca = "";
        this.Modelo = "";
        this.Anio = 0;
        this.Tipo = "";
        this.Capacidad = 0;
        this.Precio_Diario = "";
    }
}