import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import VehiculoRouter from "./routers/VehiculoRouter.js";
import PrecioRouter from "./routers/PrecioRouter.js";
import CalcularMonto from "./routers/CalcularMontoRouter.js";
import RegistroRouter from "./routers/RegistroRouter.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
new VehiculoRouter(app, "/api/vehiculos");
new PrecioRouter(app, "/api/precios");
new CalcularMonto(app, "/api/calcular-monto");
new RegistroRouter(app, "/api/registros");
const port = 3000;
app.listen(port, () => {
    console.log(`Ejemplo escuchando en ${port}`);
});
