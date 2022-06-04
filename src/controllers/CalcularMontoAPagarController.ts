import express from "express";
import { PrecioDaoMongoDb } from "../repository/PrecioDaoMongoDb.js";
import { VehiculoDaoMongodb } from "../repository/VehiculoDaoMongodb.js";

class CalcularMontoController {
  async getMonto(req: express.Request, res: express.Response) {
    const vehiculoMongoDb: VehiculoDaoMongodb = new VehiculoDaoMongodb();
    const vehiculo = await vehiculoMongoDb.get(req.params.patente);
    if (vehiculo) {
      const precioMongoDb: PrecioDaoMongoDb = new PrecioDaoMongoDb();
      const precio = await precioMongoDb.get(vehiculo.tipoDeVehiculo!);
      const diff =
        new Date(vehiculo.horaDeEgreso!).getHours() -
        new Date(vehiculo.horaDeIngreso!).getHours();
      console.log(diff);
    }
  }
}

export default new CalcularMontoController();
