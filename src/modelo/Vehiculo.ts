import { TipoDeVehiculo } from "../utils";

class Vehiculo {
  patente: string; // clave primaria
  tipoDeVehiculo: TipoDeVehiculo;
  isParked: boolean;
  horaDeIngreso: Date | null;
  horaDeEgreso: Date | null;

  constructor(
    patente: string,
    tipoDeVehiculo: TipoDeVehiculo,
    isParked: boolean,
    horaDeIngreso: Date | null,
    horaDeEgreso: Date | null
  ) {
    this.patente = patente;
    this.tipoDeVehiculo = tipoDeVehiculo;
    this.isParked = isParked;
    this.horaDeIngreso = horaDeIngreso;
    this.horaDeEgreso = horaDeEgreso;
  }
}

export default Vehiculo;
