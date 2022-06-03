interface Dao<E,K> {

    add: (Element : E) => Promise<E>;

    getAll: () => Promise<Array<E>>;

    get: (Clave : K) => Promise<E>;

    delete: (Element : E) => Promise<boolean>;

}

export default Dao;