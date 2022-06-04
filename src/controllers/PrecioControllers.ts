import express from "express";
import { PrecioDaoMongoDb } from "../repository/PrecioDaoMongoDb.js";

class PrecioController {
  async getAll(req: express.Request, res: express.Response) {
    const precioDaoMongoDb: PrecioDaoMongoDb = new PrecioDaoMongoDb();
    res.status(200).send(await precioDaoMongoDb.getAll());
  }

  async add(req: express.Request, res: express.Response) {
    console.log(req.body);
    const precioDaoMongoDb: PrecioDaoMongoDb = new PrecioDaoMongoDb();
    res.status(200).send(await precioDaoMongoDb.add(req.body));
  }

  async get(req: express.Request, res: express.Response) {
    console.log("hola");
    const precioDaoMongoDb: PrecioDaoMongoDb = new PrecioDaoMongoDb();
    const rta = await precioDaoMongoDb.get(req.params.tipoDeVehiculo);
    console.log(req.params);
    if (rta.tipoDeVehiculo != null) {
      res.status(200).send(rta);
    } else {
      res.status(500).send({
        mensaje: "no se encuentran registros para " + req.params.patente,
      });
    }
  }

  // tratar de hacer bajas logicas
  //   async delete(req: express.Request, res: express.Response) {
  //     const precioDaoMongoDb: PrecioDaoMongoDb = new PrecioDaoMongoDb();
  //     if (
  //       await precioDaoMongoDb.delete({
  //         tipoDeVehiculo: req.params.tipoDeVehiculo,
  //       })
  //     ) {
  //       res.status(201).send({
  //         mensaje: "Registro eliminado para patente: " + req.params.patente,
  //       });
  //     } else {
  //       res.status(500).send({
  //         mensaje: "no se encuentran registros para " + req.params.patente,
  //       });
  //     }
  //   }
}

export default new PrecioController();
