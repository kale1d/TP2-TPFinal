import express from "express";
import { VehiculoDaoMongodb } from "../repository/VehiculoDaoMongodb.js";

class VehiculoController {
  async getAll(req: express.Request, res: express.Response) {
    const vehiculoDaoMongodb: VehiculoDaoMongodb = new VehiculoDaoMongodb();
    res.status(200).send(await vehiculoDaoMongodb.getAll());
  }

  async add(req: express.Request, res: express.Response) {
    const vehiculoDaoMongodb: VehiculoDaoMongodb = new VehiculoDaoMongodb();
    res.status(200).send(await vehiculoDaoMongodb.add(req.body));
  }

  async get(req: express.Request, res: express.Response) {
    console.log("hola");
    const vehiculoDaoMongodb: VehiculoDaoMongodb = new VehiculoDaoMongodb();
    const rta = await vehiculoDaoMongodb.get(req.params.patente);
    console.log(req.params);
    if (rta.patente != "") {
      res.status(200).send(rta);
    } else {
      res.status(404).send({
        mensaje: "no se encuentran registros para " + req.params.patente,
      });
    }
  }

  async update(req: express.Request, res: express.Response) {
    const vehiculoDaoMongodb: VehiculoDaoMongodb = new VehiculoDaoMongodb();
    const findVehiculo = await vehiculoDaoMongodb.get(req.params.patente);
    if (findVehiculo.patente === "") {
      res.status(500).send({ message: "Vehiculo no encontrado" });
    } else {
      const rta = await vehiculoDaoMongodb.update(req.params.patente);
      console.log(rta);
      if (rta) {
        res.status(200).send(rta);
      } else {
        res.status(500).send({
          message:
            "No pudo ser cambiado el estado del vehiculo" + req.params.patente,
        });
      }
    }
  }

  // tratar de hacer bajas logicas
  async delete(req: express.Request, res: express.Response) {
    const vehiculoDaoMongodb: VehiculoDaoMongodb = new VehiculoDaoMongodb();
    if (await vehiculoDaoMongodb.delete({ patente: req.params.patente })) {
      res.status(201).send({
        mensaje: "Registro eliminado para patente: " + req.params.patente,
      });
    } else {
      res.status(500).send({
        mensaje: "no se encuentran registros para " + req.params.patente,
      });
    }
  }
}

export default new VehiculoController();
