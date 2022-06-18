import Dao from "./Dao.js";
import { ConectarMongodb } from "./ConectarMongodb.js";
import Registro from "../modelo/Registro.js";

class RegistroDaoMongoDb implements Dao<Registro, string> {
  private conectarMongodb: ConectarMongodb = new ConectarMongodb();

  async add(element: Registro): Promise<Registro> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("registros");
    console.log({ element }, "aca");
    await collection.insertOne(element);
    await this.conectarMongodb.desconectar();
    return Promise.resolve(element);
  }

  async getAll(): Promise<Registro[]> {
    const registros: Array<Registro> = [];
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("registros");
    const findResult = await collection.find({}).toArray();
    findResult.forEach((e) =>
      registros.push(new Registro(e.monto, e.patente, e.fecha))
    );
    console.log({ registros });
    await this.conectarMongodb.desconectar();
    return Promise.resolve(registros);
  }

  async get(clave: string): Promise<Registro> {
    const db = await this.conectarMongodb.conectar();
    const collection = db.collection("registro");
    const findResult = await collection.findOne({ patente: clave });
    await this.conectarMongodb.desconectar();
    const registro = new Registro(0, "", null);
    if (findResult !== null) {
      registro.monto = findResult.monto;
      registro.patente = findResult.patente;
      registro.fecha = findResult.fecha;
    }
    return Promise.resolve(registro);
  }
}

export { RegistroDaoMongoDb };
