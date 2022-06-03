import Vehiculo from '../modelo/Vehiculo.js';
import Dao from './Dao.js'
import {ConectarMongodb} from './ConectarMongodb.js'

class VehiculoDaoMongodb implements Dao<Vehiculo,string> {
  
    private conectarMongodb : ConectarMongodb = new ConectarMongodb();

    async add (element: Vehiculo) : Promise<Vehiculo> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('vehiculos');
        await collection.insertOne(element);
        await this.conectarMongodb.desconectar();
        return Promise.resolve(element);
    }
    async getAll () : Promise<Vehiculo[]> {
        const vehiculos: Array<Vehiculo> = [];        
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('vehiculos');
        const findResult = await collection.find({}).toArray();        
        findResult.forEach( e =>  vehiculos.push(  new Vehiculo(e.patente,e.color) )  );
        await this.conectarMongodb.desconectar();
        return Promise.resolve(vehiculos);
    }
    
    // si no encuentra un vehiculo, devuelve un objeto vacio
    async get (clave: string) : Promise<Vehiculo> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('vehiculos');
        const findResult = await collection.findOne({patente:clave});        
        await this.conectarMongodb.desconectar();
        const vehiculo = new Vehiculo("","");
        if(findResult !== null) {
            vehiculo.patente = findResult.patente;
            vehiculo.color = findResult.color;
        }
        return Promise.resolve(vehiculo);
    }

    async delete (element: Vehiculo) : Promise<boolean> {
        const db = await this.conectarMongodb.conectar();
        const collection = db.collection('vehiculos');
        const findResult = await collection.deleteOne({patente:element.patente}); 
        await this.conectarMongodb.desconectar();
        let rta = false;
        if (findResult.deletedCount > 0) {
            rta = true;
        }
        console.log("Estado de rta " + rta );
        
        return Promise.resolve( rta );
    }  
}

export {VehiculoDaoMongodb}