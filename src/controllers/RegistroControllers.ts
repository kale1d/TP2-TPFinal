import express from "express";
import { RegistroDaoMongoDb } from "../repository/RegistroDaoMongoDb.js";
import json2csv from "json2csv";
import moment from "moment";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

class RegistroController {
  async getAll(req: express.Request, res: express.Response) {
    const registroDaoMongoDb: RegistroDaoMongoDb = new RegistroDaoMongoDb();
    res.status(200).send(await registroDaoMongoDb.getAll());
  }

  async add(req: express.Request, res: express.Response) {
    const registroDaoMongoDb: RegistroDaoMongoDb = new RegistroDaoMongoDb();
    res.status(200).send(await registroDaoMongoDb.add(req.body));
  }

  async get(req: express.Request, res: express.Response) {
    const registroDaoMongoDb: RegistroDaoMongoDb = new RegistroDaoMongoDb();
    const rta = await registroDaoMongoDb.get(req.params.patente);
    console.log(req.params);
    if (rta.patente != null) {
      res.status(200).send(rta);
    } else {
      res.status(500).send({
        mensaje: "no se encuentran registros para " + req.params.patente,
      });
    }
  }

  async generarInforme(req: express.Request, res: express.Response) {
    const fields = ["monto", "patente"];
    const dateTime = moment().format("YYYYMMDDhhmmss");
    const registroDaoMongoDb: RegistroDaoMongoDb = new RegistroDaoMongoDb();

    const registros = await registroDaoMongoDb.getAll();

    const csv = json2csv.parse(registros, { fields });
    console.log(csv);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(
      __dirname,
      "..",
      "exports",
      "csv-" + dateTime + ".csv"
    );
    fs.writeFileSync(filePath, csv);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=tutorials.csv");
    res.status(200).end(csv);
  }
}

export default new RegistroController();
