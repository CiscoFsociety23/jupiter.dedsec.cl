import express, { Router, Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { AuthMiddleware } from '../middleware/authMiddleware';

const authController: Router = express.Router();
const authService: AuthService = new AuthService();
const authMiddleware: AuthMiddleware = new AuthMiddleware();

authController.get('/', authMiddleware.checkParams, async (req: Request, res: Response) => {
    try {
        const { user, passwd, client} = req.query;
        if(await authService.checkCredentials(String(user), String(passwd))){
            res.json({ token: await authService.getToken(String(client)) });
        } else {
            res.json({ status: false });
        };
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    };
});

export { authController };
