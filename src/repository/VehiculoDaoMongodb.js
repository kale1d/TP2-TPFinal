var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Vehiculo from "../modelo/Vehiculo.js";
import { ConectarMongodb } from "./ConectarMongodb.js";
class VehiculoDaoMongodb {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("vehiculos");
            yield collection.insertOne(element);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculos = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("vehiculos");
            const findResult = yield collection.find({}).toArray();
            findResult.forEach((e) => vehiculos.push(new Vehiculo(e.patente, e.tipoDeVehiculo, e.isParked, e.horaDeIngreso, e.horaDeEgreso)));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(vehiculos);
        });
    }
    // si no encuentra un vehiculo, devuelve un objeto vacio
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("vehiculos");
            const findResult = yield collection.findOne({ patente: clave });
            yield this.conectarMongodb.desconectar();
            const vehiculo = new Vehiculo("", null, false, null, null);
            if (findResult !== null) {
                vehiculo.patente = findResult.patente;
                vehiculo.tipoDeVehiculo = findResult.tipoDeVehiculo;
                vehiculo.isParked = findResult.isParked;
                vehiculo.horaDeIngreso = findResult.horaDeIngreso;
                vehiculo.horaDeEgreso = findResult.horaDeEgreso;
            }
            return Promise.resolve(vehiculo);
        });
    }
    delete(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("vehiculos");
            const findResult = yield collection.deleteOne({ patente: element.patente });
            yield this.conectarMongodb.desconectar();
            let rta = false;
            if (findResult.deletedCount > 0) {
                rta = true;
            }
            console.log("Estado de rta " + rta);
            return Promise.resolve(rta);
        });
    }
    update(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("vehiculos");
            const filter = { patente: clave };
            const updateDocument = {
                $set: {
                    horaDeEgreso: Date.now(),
                    isParked: false,
                },
            };
            const result = yield collection.updateOne(filter, updateDocument);
            return Promise.resolve(result.acknowledged);
        });
    }
}
export { VehiculoDaoMongodb };
