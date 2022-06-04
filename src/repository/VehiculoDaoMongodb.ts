import Vehiculo from "../modelo/Vehiculo.js";
import Dao from "./Dao.js";
import { ConectarMongodb } from "./ConectarMongodb.js";

class VehiculoDaoMongodb implements Dao<Vehiculo, string> {
  private conectarMongodb: ConectarMongodb = new ConectarMongodb();

  async add(element: Vehiculo): Promise<Vehiculo> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("vehiculos");
    await collection.insertOne(element);
    await this.conectarMongodb.desconectar();
    return Promise.resolve(element);
  }
  async getAll(): Promise<Vehiculo[]> {
    const vehiculos: Array<Vehiculo> = [];
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("vehiculos");
    const findResult = await collection.find({}).toArray();
    findResult.forEach((e) =>
      vehiculos.push(
        new Vehiculo(
          e.patente,
          e.tipoDeVehiculo,
          e.isParked,
          e.horaDeIngreso,
          e.horaDeEgreso
        )
      )
    );
    await this.conectarMongodb.desconectar();
    return Promise.resolve(vehiculos);
  }

  // si no encuentra un vehiculo, devuelve un objeto vacio
  async get(clave: string): Promise<Vehiculo> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("vehiculos");
    const findResult = await collection.findOne({ patente: clave });
    await this.conectarMongodb.desconectar();
    const vehiculo = new Vehiculo("", null, false, null, null);
    if (findResult !== null) {
      vehiculo.patente = findResult.patente;
      vehiculo.tipoDeVehiculo = findResult.tipoDeVehiculo;
      vehiculo.isParked = findResult.isParked;
      vehiculo.horaDeIngreso = findResult.horaDeIngreso;
      vehiculo.horaDeEgreso = findResult.horaDeEgreso;
    }
    return Promise.resolve(vehiculo);
  }

  async delete(element: Partial<Vehiculo>): Promise<boolean> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("vehiculos");
    const findResult = await collection.deleteOne({ patente: element.patente });
    await this.conectarMongodb.desconectar();
    let rta = false;
    if (findResult.deletedCount > 0) {
      rta = true;
    }
    console.log("Estado de rta " + rta);

    return Promise.resolve(rta);
  }

  async update(clave: string): Promise<boolean> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("vehiculos");

    const filter = { patente: clave };
    const updateDocument = {
      $set: {
        horaDeEgreso: Date.now(),
        isParked: false,
      },
    };
    const result = await collection.updateOne(filter, updateDocument);

    return Promise.resolve(result.acknowledged);
  }
}

export { VehiculoDaoMongodb };
