import express from "express";
import { PrecioDaoMongoDb } from "../repository/PrecioDaoMongoDb.js";
import { RegistroDaoMongoDb } from "../repository/RegistroDaoMongoDb.js";
import { VehiculoDaoMongodb } from "../repository/VehiculoDaoMongodb.js";

class CalcularMontoController {
  async getMonto(req: express.Request, res: express.Response) {
    const vehiculoMongoDb: VehiculoDaoMongodb = new VehiculoDaoMongodb();
    const vehiculo = await vehiculoMongoDb.get(req.params.patente);
    if (vehiculo) {
      const precioMongoDb: PrecioDaoMongoDb = new PrecioDaoMongoDb();
      const precio = await precioMongoDb.get(vehiculo.tipoDeVehiculo!);
      const diff =
        new Date(vehiculo.horaDeEgreso!).valueOf() -
        new Date(vehiculo.horaDeIngreso!).valueOf();
      const diffInHours = diff / 1000 / 60 / 60;
      const montoAAbonar = precio.valor * diffInHours;
      const obj = { monto: montoAAbonar, patente: vehiculo.patente };
      const registroMongoDb: RegistroDaoMongoDb = new RegistroDaoMongoDb();
      const registro = await registroMongoDb.add(obj);
      console.log(registro);
      res.status(200).send(obj);
    }
  }
}

export default new CalcularMontoController();
