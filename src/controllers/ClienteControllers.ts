import express from 'express'
import {ClienteDaoMongodb} from '../repository/ClienteDaoMongodb.js'

class ClienteController {

    async listar(req: express.Request, res: express.Response) {
        const clienteDaoMongodb : ClienteDaoMongodb = new ClienteDaoMongodb();
        res.status(200).send( await clienteDaoMongodb.getAll());
    }

}

export default new ClienteController();