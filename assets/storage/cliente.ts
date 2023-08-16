import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class dtoCliente{
    @Expose({name:'id_cliente'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo id_cliente es obligatorio.`}}})
    ID_Cliente:number;

    @Expose({name:'nombre'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo id_cliente es obligatorio.`}}})
    Nombre:string;

    @Expose({name:'apellido'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo apellido es obligatorio.`}}})
    Apellido:string;

    @Expose({name:'dni'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo dni es obligatorio.`}}})
    DNI:string;

    @Expose({name:'direccion'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo direccion es obligatorio.`}}})
    Direccion:string;
    
    @Expose({name:'telefono'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo telefono es obligatorio.`}}})
    Telefono:string;

    @Expose({name:'email'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo email es obligatorio.`}}})
    Email:string;

    constructor(data: Partial<dtoCliente>){
        Object.assign(this, data);
        this.ID_Cliente = 0;
        this.Nombre = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "";
        this.Email = "";
    }
}