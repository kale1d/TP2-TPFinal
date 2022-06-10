var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RegistroDaoMongoDb } from "../repository/RegistroDaoMongoDb.js";
import json2csv from "json2csv";
import moment from "moment";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
class RegistroController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registroDaoMongoDb = new RegistroDaoMongoDb();
            res.status(200).send(yield registroDaoMongoDb.getAll());
        });
    }
    add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const registroDaoMongoDb = new RegistroDaoMongoDb();
            res.status(200).send(yield registroDaoMongoDb.add(req.body));
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const registroDaoMongoDb = new RegistroDaoMongoDb();
            const rta = yield registroDaoMongoDb.get(req.params.patente);
            console.log(req.params);
            if (rta.patente != null) {
                res.status(200).send(rta);
            }
            else {
                res.status(500).send({
                    mensaje: "no se encuentran registros para " + req.params.patente,
                });
            }
        });
    }
    generarInforme(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fields = ["monto", "patente"];
            const dateTime = moment().format("YYYYMMDDhhmmss");
            const registroDaoMongoDb = new RegistroDaoMongoDb();
            const registros = yield registroDaoMongoDb.getAll();
            const csv = json2csv.parse(registros, { fields });
            console.log(csv);
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const filePath = path.join(__dirname, "..", "exports", "csv-" + dateTime + ".csv");
            fs.writeFileSync(filePath, csv);
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
            res.status(200).end(csv);
        });
    }
}
export default new RegistroController();
