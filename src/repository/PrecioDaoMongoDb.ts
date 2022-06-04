import Dao from "./Dao.js";
import { ConectarMongodb } from "./ConectarMongodb.js";
import Precio from "../modelo/Precio.js";

class PrecioDaoMongoDb implements Dao<Precio, string> {
  private conectarMongodb: ConectarMongodb = new ConectarMongodb();

  async add(element: Precio): Promise<Precio> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("precios");
    console.log(collection);
    console.log({ element });
    await collection.insertOne(element);
    await this.conectarMongodb.desconectar();
    return Promise.resolve(element);
  }
  async getAll(): Promise<Precio[]> {
    const precios: Array<Precio> = [];
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("precios");
    const findResult = await collection.find({}).toArray();
    console.log(findResult);
    findResult.forEach((e) =>
      precios.push(new Precio(e.valor, e.tipoDeVehiculo))
    );
    await this.conectarMongodb.desconectar();
    return Promise.resolve(precios);
  }

  // si no encuentra un vehiculo, devuelve un objeto vacio
  async get(clave: string): Promise<Precio> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("precios");
    const findResult = await collection.findOne({ tipoDeVehiculo: clave });
    await this.conectarMongodb.desconectar();
    const precio = new Precio(0, null);
    if (findResult !== null) {
      precio.tipoDeVehiculo = findResult.tipoDeVehiculo;
      precio.valor = findResult.valor;
    }
    return Promise.resolve(precio);
  }

  async delete(element: Partial<Precio>): Promise<boolean> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("precios");
    const findResult = await collection.deleteOne({
      tipoDeVehiculo: element.tipoDeVehiculo,
    });
    await this.conectarMongodb.desconectar();
    let rta = false;
    if (findResult.deletedCount > 0) {
      rta = true;
    }
    console.log("Estado de rta " + rta);

    return Promise.resolve(rta);
  }
}

export { PrecioDaoMongoDb };
