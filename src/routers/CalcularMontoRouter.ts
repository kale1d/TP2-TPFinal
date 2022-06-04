import express from "express";
import CalcularMontoController from "../controllers/CalcularMontoAPagarController.js";

class CalcularMonto {
  app: express.Application;
  nombre: string;
  constructor(app: express.Application, nombre: string) {
    this.app = app;
    this.nombre = nombre;
    this.configurarRutas();
  }
  configurarRutas() {
    this.app
      .route(this.nombre + "/:patente")
      .get(CalcularMontoController.getMonto);

    return this.app;
  }
}

export default CalcularMonto;
