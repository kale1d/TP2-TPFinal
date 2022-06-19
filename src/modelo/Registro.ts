class Registro {
  monto: number;
  patente: string;
  fecha: Date | null;

  constructor(monto: number, patente: string, fecha: Date | null) {
    this.monto = monto;
    this.patente = patente;
    this.fecha = fecha;
  }
}

export default Registro;
