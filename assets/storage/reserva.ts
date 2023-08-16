import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class dtoReserva{
    @Expose({name:'id_reserva'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo id_reserva es obligatorio.`}}})
    ID_Rerserva:number;

    @Expose({name:'id_cliente'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo id_cliente es obligatorio.`}}})
    ID_Cliente:string;

    @Expose({name:'id_automovil'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo id_automovil es obligatorio.`}}})
    ID_Automovil:string;

    @Expose({name:'fecha_reserva'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo fecha_reserva es obligatorio.`}}})
    Fecha_Reserva:string;

    @Expose({name:'fecha_inicio'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo fecha_inicio es obligatorio.`}}})
    Fecha_Inicio:string;
    
    @Expose({name:'fecha_fin'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo fecha_fin es obligatorio.`}}})
    Fecha_Fin:string;

    @Expose({name:'estado'})
    @IsDefined({message:()=>{throw {status:422, message: `El campo email es obligatorio.`}}})
    Estado:string;
}