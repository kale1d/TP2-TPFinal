import { TipoDeVehiculo } from "../utils";

class Precio {
  valor: number;
  tipoDeVehiculo: TipoDeVehiculo;

  constructor(valor: number, tipoDeVehiculo: TipoDeVehiculo) {
    this.valor = valor;
    this.tipoDeVehiculo = tipoDeVehiculo;
  }
}

export default Precio;
