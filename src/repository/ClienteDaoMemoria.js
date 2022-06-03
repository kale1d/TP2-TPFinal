class ClienteDaoMemoria {
    constructor() {
        this.clientes = [];
    }
    add(cliente) {
        this.clientes.push(cliente);
        return Promise.resolve(cliente);
    }
    getAll() {
        return Promise.resolve(this.clientes);
    }
    get(clave) {
        return Promise.resolve(this.clientes.filter(cliente => cliente.documento.toString() == clave)[0]);
    }
    delete(Element) {
        // implementar
        return Promise.resolve(false);
    }
}
export default ClienteDaoMemoria;
