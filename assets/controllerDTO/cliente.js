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
export class dtoCliente {
    constructor(data) {
        Object.assign(this, data);
        this.ID_Cliente = 0;
        this.Nombre = "";
        this.DNI = "";
        this.Direccion = "";
        this.Telefono = "";
        this.Email = "";
    }
}
__decorate([
    Expose({ name: 'id_cliente' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_cliente es obligatorio.` }; } }),
    __metadata("design:type", Number)
], dtoCliente.prototype, "ID_Cliente", void 0);
__decorate([
    Expose({ name: 'nombre' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo id_cliente es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoCliente.prototype, "Nombre", void 0);
__decorate([
    Expose({ name: 'apellido' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo apellido es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoCliente.prototype, "Apellido", void 0);
__decorate([
    Expose({ name: 'dni' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo dni es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoCliente.prototype, "DNI", void 0);
__decorate([
    Expose({ name: 'direccion' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo direccion es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoCliente.prototype, "Direccion", void 0);
__decorate([
    Expose({ name: 'telefono' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo telefono es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoCliente.prototype, "Telefono", void 0);
__decorate([
    Expose({ name: 'email' }),
    IsDefined({ message: () => { throw { status: 422, message: `El campo email es obligatorio.` }; } }),
    __metadata("design:type", String)
], dtoCliente.prototype, "Email", void 0);
