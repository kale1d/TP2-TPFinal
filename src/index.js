import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import VehiculoRouter from "./routers/VehiculoRouter.js";
import PrecioRouter from "./routers/PrecioRouter.js";
import CalcularMonto from "./routers/CalcularMontoRouter.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());
new VehiculoRouter(app, "/api/vehiculos");
new PrecioRouter(app, "/api/precios");
new CalcularMonto(app, "/api/calcular-monto");
const port = 3000;
app.listen(port, () => {
    console.log(`Ejemplo escuchando en ${port}`);
});
/*




/*
import {ClienteDaoMongodb} from './dao/ClienteDaoMongodb.js'
import Cliente from './modelo/Cliente.js'

async function main() {

    const clienteDaoMongodb : ClienteDaoMongodb = new ClienteDaoMongodb();
    const cliente : Cliente = new Cliente("Maria",21124);
    await clienteDaoMongodb.add(cliente);
    console.log(await clienteDaoMongodb.getAll());
    

}

main()

*/
/*
import Cliente from './modelo/Cliente.js'
import ClienteDaoMemoria from './dao/ClienteDaoMemoria.js'

//const cliente : Cliente = new Cliente("Carlos",2543453);

const clienteDaoMemoria : ClienteDaoMemoria = new ClienteDaoMemoria();

clienteDaoMemoria.add(new Cliente("Carlos",2543453));
clienteDaoMemoria.add(new Cliente("Pedro",2345355));
clienteDaoMemoria.add(new Cliente("Maria",21123233));

console.log(clienteDaoMemoria.getAll());

*/
