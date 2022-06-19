var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VehiculoDaoMongodb } from "../repository/VehiculoDaoMongodb.js";
class VehiculoController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculoDaoMongodb = new VehiculoDaoMongodb();
            res.status(200).send(yield vehiculoDaoMongodb.getAll());
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculoDaoMongodb = new VehiculoDaoMongodb();
            res.status(200).send(yield vehiculoDaoMongodb.add(req.body));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("hola");
            const vehiculoDaoMongodb = new VehiculoDaoMongodb();
            const rta = yield vehiculoDaoMongodb.get(req.params.patente);
            console.log(req.params);
            if (rta.patente != "") {
                res.status(200).send(rta);
            }
            else {
                res.status(404).send({
                    mensaje: "no se encuentran registros para " + req.params.patente,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculoDaoMongodb = new VehiculoDaoMongodb();
            const findVehiculo = yield vehiculoDaoMongodb.get(req.params.patente);
            if (findVehiculo.patente === "") {
                res.status(500).send({ message: "Vehiculo no encontrado" });
            }
            else {
                const rta = yield vehiculoDaoMongodb.update(req.params.patente);
                console.log(rta);
                if (rta) {
                    res.status(200).send(rta);
                }
                else {
                    res.status(500).send({
                        message: "No pudo ser cambiado el estado del vehiculo" + req.params.patente,
                    });
                }
            }
        });
    }
    // tratar de hacer bajas logicas
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculoDaoMongodb = new VehiculoDaoMongodb();
            if (yield vehiculoDaoMongodb.delete({ patente: req.params.patente })) {
                res.status(201).send({
                    mensaje: "Registro eliminado para patente: " + req.params.patente,
                });
            }
            else {
                res.status(500).send({
                    mensaje: "no se encuentran registros para " + req.params.patente,
                });
            }
        });
    }
}
export default new VehiculoController();
