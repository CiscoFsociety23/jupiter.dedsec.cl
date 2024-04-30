import express, { Express, Router } from 'express';
import { jupiterController } from './api/jupiter/controllers/jupiterController';
import { authController } from './api/jupiter/controllers/authController';

class Routing {

    public apiRouter(app: Express) {
        const router: Router = express.Router();
        app.use('/api-jupiter/', jupiterController);
        app.use('/api-jupiter/auth', authController);
    };

};

export { Routing };
