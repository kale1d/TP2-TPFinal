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
import Registro from "../modelo/Registro.js";
class RegistroDaoMongoDb {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("registros");
            console.log(collection);
            console.log({ element });
            yield collection.insertOne(element);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const registros = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("registros");
            const findResult = yield collection.find({}).toArray();
            findResult.forEach((e) => registros.push(new Registro(e.monto, e.patente)));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(registros);
        });
    }
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection("registro");
            const findResult = yield collection.findOne({ patente: clave });
            yield this.conectarMongodb.desconectar();
            const registro = new Registro(0, "");
            if (findResult !== null) {
                registro.monto = findResult.monto;
                registro.patente = findResult.patente;
            }
            return Promise.resolve(registro);
        });
    }
}
export { RegistroDaoMongoDb };
