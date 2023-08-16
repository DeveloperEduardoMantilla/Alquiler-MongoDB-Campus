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
export class dtoAlquiler {
    constructor(data) {
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
__decorate([
    Expose({ name: 'id_alquiler' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_alquiler es obligatorio` }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "ID_Alquiler", void 0);
__decorate([
    Expose({ name: 'id_cliente' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_cliente es obligatorio` }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "ID_Cliente", void 0);
__decorate([
    Expose({ name: 'id_automovil' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_automovil es obligatorio` }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "ID_Automovil", void 0);
__decorate([
    Expose({ name: 'fecha_inicio' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo fecha_inicio es obligatorio` }; } }),
    __metadata("design:type", String)
], dtoAlquiler.prototype, "Fecha_Inicio", void 0);
__decorate([
    Expose({ name: 'fecha_fin' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo fecha_fin es obligatorio` }; } }),
    __metadata("design:type", String)
], dtoAlquiler.prototype, "Fecha_Fin", void 0);
__decorate([
    Expose({ name: 'costo_total' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo costo_total es obligatorio` }; } }),
    __metadata("design:type", Number)
], dtoAlquiler.prototype, "Costo_Total", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo estado es obligatorio` }; } }),
    __metadata("design:type", String)
], dtoAlquiler.prototype, "Estado", void 0);
