import Cliente from '../modelo/Cliente.js';
import Dao from './Dao.js';

class ClienteDaoMemoria implements Dao<Cliente,string> {
    clientes: Array<Cliente> = [];
    add (cliente: Cliente) : Promise<Cliente> {
        this.clientes.push(cliente);
        return Promise.resolve(cliente);
    }
    getAll () : Promise<Cliente[]> {
        return Promise.resolve(this.clientes);
    }
    get (clave: string) : Promise<Cliente> {
        return Promise.resolve(this.clientes.filter(cliente => cliente.documento.toString() == clave )[0]);
    }   
    delete (Element: Cliente) : Promise<boolean> {
        // implementar
        return Promise.resolve(false);    
    }
}

export default ClienteDaoMemoria