var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrecioDaoMongoDb } from "../repository/PrecioDaoMongoDb.js";
import { RegistroDaoMongoDb } from "../repository/RegistroDaoMongoDb.js";
import { VehiculoDaoMongodb } from "../repository/VehiculoDaoMongodb.js";
class CalcularMontoController {
    getMonto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vehiculoMongoDb = new VehiculoDaoMongodb();
            const vehiculo = yield vehiculoMongoDb.get(req.params.patente);
            if (vehiculo) {
                const precioMongoDb = new PrecioDaoMongoDb();
                const precio = yield precioMongoDb.get(vehiculo.tipoDeVehiculo);
                const diff = new Date(vehiculo.horaDeEgreso).valueOf() -
                    new Date(vehiculo.horaDeIngreso).valueOf();
                const diffInHours = diff / 1000 / 60 / 60;
                const montoAAbonar = precio.valor * diffInHours;
                // En caso de querer hacerlo bien, se comenta la linea 17 y se descomenta la de abajo
                // let montoAAbonar;
                // if (diffInHours <= 1){
                //   montoAAbonar = precio.valor;
                // }else{
                //   montoAAbonar = precio.valor * diffInHours;
                // }
                const obj = {
                    monto: montoAAbonar,
                    patente: vehiculo.patente,
                    fecha: vehiculo.horaDeIngreso,
                };
                const registroMongoDb = new RegistroDaoMongoDb();
                const registro = yield registroMongoDb.add(obj);
                console.log(registro);
                res.status(200).send(obj);
            }
        });
    }
}
export default new CalcularMontoController();
