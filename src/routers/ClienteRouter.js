import ClienteControllers from '../controllers/ClienteControllers.js';
class ClienteRouter {
    constructor(app, nombre) {
        this.app = app;
        this.nombre = nombre;
        this.configurarRutas();
    }
    configurarRutas() {
        this.app.route(this.nombre).get(ClienteControllers.listar);
        /*
        this.app.route(this.nombre).get( (req, res) => {
            console.log(req.query)
            res.json({mensaje: "Vamos coders !!! " + req.query.nombre })
        });
        */
        return this.app;
        /*
        app.get('/api/saludo', (req, res) => {
        // res.send('Hola mundo!')
        console.log(req.query);
        res.json({mensaje: "Vamos coders !!! " + req.query.nombre })
        })

        app.get('/api/saludo/:codigo', (req, res) => {
            console.log(req.params.codigo);
            res.json({mensaje: "busco codigo " + req.params.codigo })
        })

        app.post('/api/saludo', (req, res) => {
            console.log(req.body);
            res.send('Pedido por post');
        })
        */
    }
}
export default ClienteRouter;
