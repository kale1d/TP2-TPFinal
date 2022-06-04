var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ConectarMongodb } from "./ConectarMongodb.js";
import Precio from "../modelo/Precio.js";
class PrecioDaoMongoDb {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("precios");
            console.log(collection);
            console.log({ element });
            yield collection.insertOne(element);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const precios = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("precios");
            const findResult = yield collection.find({}).toArray();
            console.log(findResult);
            findResult.forEach((e) => precios.push(new Precio(e.valor, e.tipoDeVehiculo)));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(precios);
        });
    }
    // si no encuentra un vehiculo, devuelve un objeto vacio
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("precios");
            const findResult = yield collection.findOne({ tipoDeVehiculo: clave });
            yield this.conectarMongodb.desconectar();
            const precio = new Precio(0, null);
            if (findResult !== null) {
                precio.tipoDeVehiculo = findResult.tipoDeVehiculo;
                precio.valor = findResult.valor;
            }
            return Promise.resolve(precio);
        });
    }
    delete(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("precios");
            const findResult = yield collection.deleteOne({
                tipoDeVehiculo: element.tipoDeVehiculo,
            });
            yield this.conectarMongodb.desconectar();
            let rta = false;
            if (findResult.deletedCount > 0) {
                rta = true;
            }
            console.log("Estado de rta " + rta);
            return Promise.resolve(rta);
        });
    }
}
export { PrecioDaoMongoDb };
