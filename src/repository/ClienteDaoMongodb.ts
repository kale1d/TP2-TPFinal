import Cliente from '../modelo/Cliente.js';
import Dao from './Dao.js'
import {ConectarMongodb} from './ConectarMongodb.js'

class ClienteDaoMongodb implements Dao<Cliente,string> {
  
    private conectarMongodb : ConectarMongodb = new ConectarMongodb();

    async add (Element: Cliente) : Promise<Cliente> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('clientes');
        await collection.insertOne(Element);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(Element);
    }
    async getAll () : Promise<Cliente[]> {
        const clientes: Array<Cliente> = [];        
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('clientes');
        const findResult = await collection.find({}).toArray();        
        findResult.forEach( e =>  clientes.push(  new Cliente(e.nombre,e.documento) )  );
        await this.conectarMongodb.desconectar();
        return Promise.resolve(clientes);
    }
    async get (clave: string) : Promise<Cliente> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('clientes');
        const findResult = await collection.findOne({nombre:clave});        
        await this.conectarMongodb.desconectar();
        const cliente = new Cliente("",0);
        if(findResult !== null) {
            cliente.documento = findResult.documento;
            cliente.nombre = findResult.nombre;
        }
        return Promise.resolve(cliente);
    }
    delete (Element: Cliente) : Promise<boolean> {
        // falta implementar
        const cliente = new Cliente("",1);
        return Promise.resolve(false);
    }  
}

export {ClienteDaoMongodb}