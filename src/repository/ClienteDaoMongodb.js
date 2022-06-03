var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Cliente from '../modelo/Cliente.js';
import { ConectarMongodb } from './ConectarMongodb.js';
class ClienteDaoMongodb {
    constructor() {
        this.conectarMongodb = new ConectarMongodb();
    }
    add(Element) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('clientes');
            yield collection.insertOne(Element);
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(Element);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const clientes = [];
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('clientes');
            const findResult = yield collection.find({}).toArray();
            findResult.forEach(e => clientes.push(new Cliente(e.nombre, e.documento)));
            yield this.conectarMongodb.desconectar();
            return Promise.resolve(clientes);
        });
    }
    get(clave) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.conectarMongodb.conectar();
            const collection = db.collection('clientes');
            const findResult = yield collection.findOne({ nombre: clave });
            yield this.conectarMongodb.desconectar();
            const cliente = new Cliente("", 0);
            if (findResult !== null) {
                cliente.documento = findResult.documento;
                cliente.nombre = findResult.nombre;
            }
            return Promise.resolve(cliente);
        });
    }
    delete(Element) {
        // falta implementar
        const cliente = new Cliente("", 1);
        return Promise.resolve(false);
    }
}
export { ClienteDaoMongodb };
