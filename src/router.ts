import express, { Express, Router } from 'express';
import { jupiterController } from './api/jupiter/controllers/jupiterController';

class Routing {

    public apiRouter(app: Express) {
        const router: Router = express.Router();
        app.use('/api-jupiter/', jupiterController);
    };

};

export { Routing };
