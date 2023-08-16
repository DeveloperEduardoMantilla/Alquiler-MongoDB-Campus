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
export class dtoAutomovil {
    constructor(data) {
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
__decorate([
    Expose({ name: 'id_automovil' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_automovil es obligatorio.` }; } }),
    __metadata("design:type", Number)
], dtoAutomovil.prototype, "ID_Automovil", void 0);
__decorate([
    Expose({ name: 'marca' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo marca es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoAutomovil.prototype, "Marca", void 0);
__decorate([
    Expose({ name: 'modelo' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo modelo es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoAutomovil.prototype, "Modelo", void 0);
__decorate([
    Expose({ name: 'anio' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo anio es obligatorio.` }; } }),
    __metadata("design:type", Number)
], dtoAutomovil.prototype, "Anio", void 0);
__decorate([
    Expose({ name: 'tipo' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo tipo es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoAutomovil.prototype, "Tipo", void 0);
__decorate([
    Expose({ name: 'capacidad' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo capacidad es obligatorio.` }; } }),
    __metadata("design:type", Number)
], dtoAutomovil.prototype, "Capacidad", void 0);
__decorate([
    Expose({ name: 'precio_diario' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo precio_diario es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoAutomovil.prototype, "Precio_Diario", void 0);
