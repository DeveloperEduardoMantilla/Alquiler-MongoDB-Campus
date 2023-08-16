import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class dtoEmpleado{
    @Expose({name:'id_empleado'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo id_empleado es obligatorio.`}}})
    ID_Empleado:number;

    @Expose({name:'nombre'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo nombre es obligatorio.`}}})
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

    @Expose({name:'cargo'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo cargo es obligatorio.`}}})
    Cargo:string;

    constructor(data: Partial<dtoEmpleado>){
        Object.assign(this, data);
        this.ID_Empleado = 0;
        this.Nombre = "";
        this.Apellido = "";
        this.DNI = "";
        this.Telefono = "";
        this.Cargo = "";
    }
}