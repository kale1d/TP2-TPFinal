import VehiculoController from '../controllers/VehiculoControllers.js';
class VehiculoRouter {
    constructor(app, nombre) {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.route(this.nombre)
            .get(VehiculoController.getAll)
            .post(VehiculoController.add);
        this.app.route(this.nombre + "/:patente")
            .get(VehiculoController.get)
            .delete(VehiculoController.delete);
        return this.app;
    }
}
export default VehiculoRouter;
