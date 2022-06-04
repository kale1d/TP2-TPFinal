import CalcularMontoController from "../controllers/CalcularMontoAPagarController.js";
class CalcularMonto {
    constructor(app, nombre) {
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
