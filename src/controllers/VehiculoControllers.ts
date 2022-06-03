import express from 'express'
import {VehiculoDaoMongodb} from '../repository/VehiculoDaoMongodb.js'

class VehiculoController {

    async getAll(req: express.Request, res: express.Response) {
        const vehiculoDaoMongodb : VehiculoDaoMongodb = new VehiculoDaoMongodb();
        res.status(200).send( await vehiculoDaoMongodb.getAll());
    }

    async add (req: express.Request, res: express.Response) {
        const vehiculoDaoMongodb : VehiculoDaoMongodb = new VehiculoDaoMongodb();
        res.status(200).send( await vehiculoDaoMongodb.add(req.body));
    }

    async get (req: express.Request, res: express.Response) {
        const vehiculoDaoMongodb : VehiculoDaoMongodb = new VehiculoDaoMongodb();
        const rta = await vehiculoDaoMongodb.get(req.params.patente);
        if (rta.patente != "") {
            res.status(200).send( rta );
        } else {
            res.status(404).send( { mensaje : "no se encuentran registros para " + req.params.patente} );
        }
    }

    // tratar de hacer bajas logicas
    async delete (req: express.Request, res: express.Response) {
        const vehiculoDaoMongodb : VehiculoDaoMongodb = new VehiculoDaoMongodb();
        if (await vehiculoDaoMongodb.delete({patente:req.params.patente,color:""})) {
            res.status(201).send( { mensaje : "Registro eliminado para patente: " + req.params.patente} );
        } else {
            res.status(400).send( { mensaje : "no se encuentran registros para " + req.params.patente} );
        }
    }

}

export default new VehiculoController();