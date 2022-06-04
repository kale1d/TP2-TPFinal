import express from "express";
import PrecioController from "../controllers/PrecioControllers.js";

class PrecioRouter {
  app: express.Application;
  nombre: string;
  constructor(app: express.Application, nombre: string) {
    this.app = app;
    this.nombre = nombre;
    this.configurarRutas();
  }
  configurarRutas() {
    this.app
      .route(this.nombre)
      .get(PrecioController.getAll)
      .post(PrecioController.add);

    this.app.route(this.nombre + "/:tipoDeVehiculo").get(PrecioController.get);

    return this.app;
  }
}

export default PrecioRouter;
