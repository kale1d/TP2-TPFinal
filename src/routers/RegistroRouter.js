import RegistroController from "../controllers/RegistroControllers.js";
class RegistroRouter {
    constructor(app, nombre) {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app
            .route(this.nombre)
            .get(RegistroController.getAll)
            .post(RegistroController.add);
        this.app
            .route(this.nombre + "buscarPatente/:patente")
            .get(RegistroController.get);
        this.app
            .route(this.nombre + "/generarInforme")
            .get(RegistroController.generarInforme);
        return this.app;
    }
}
export default RegistroRouter;
