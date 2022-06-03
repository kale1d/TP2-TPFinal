class Vehiculo {

    patente : string;  // clave primaria
    color : string;
    
    constructor(patente : string, color : string) {
        this.patente = patente;
        this.color = color;
    }

}

export default Vehiculo