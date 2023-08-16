var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from "class-transformer";
import { IsDefined } from "class-validator";
export class dtoReserva {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Rerserva = 0;
        this.ID_Cliente = "";
        this.ID_Automovil = "";
        this.Fecha_Reserva = "";
        this.Fecha_Inicio = "";
        this.Fecha_Fin = "";
        this.Estado = "";
    }
}
__decorate([
    Expose({ name: 'id_reserva' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_reserva es obligatorio.` }; } }),
    __metadata("design:type", Number)
], dtoReserva.prototype, "ID_Rerserva", void 0);
__decorate([
    Expose({ name: 'id_cliente' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_cliente es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoReserva.prototype, "ID_Cliente", void 0);
__decorate([
    Expose({ name: 'id_automovil' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_automovil es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoReserva.prototype, "ID_Automovil", void 0);
__decorate([
    Expose({ name: 'fecha_reserva' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo fecha_reserva es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoReserva.prototype, "Fecha_Reserva", void 0);
__decorate([
    Expose({ name: 'fecha_inicio' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo fecha_inicio es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoReserva.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: 'fecha_fin' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo fecha_fin es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoReserva.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo email es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoReserva.prototype, "Estado", void 0);
