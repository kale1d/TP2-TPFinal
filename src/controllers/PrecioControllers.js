var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrecioDaoMongoDb } from "../repository/PrecioDaoMongoDb.js";
class PrecioController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const precioDaoMongoDb = new PrecioDaoMongoDb();
            res.status(200).send(yield precioDaoMongoDb.getAll());
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const precioDaoMongoDb = new PrecioDaoMongoDb();
            res.status(200).send(yield precioDaoMongoDb.add(req.body));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hola");
            const precioDaoMongoDb = new PrecioDaoMongoDb();
            const rta = yield precioDaoMongoDb.get(req.params.tipoDeVehiculo);
            console.log(req.params);
            if (rta.tipoDeVehiculo != null) {
                res.status(200).send(rta);
            }
            else {
                res.status(500).send({
                    mensaje: "no se encuentran registros para " + req.params.patente,
                });
            }
        });
    }
}
export default new PrecioController();
