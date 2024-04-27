import express, { Router, Request, Response } from 'express';

const authController: Router = express.Router();

authController.get('/', async (req: Request, res: Response) => {
    try {
        res.json({ status: true });
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    };
});

export { authController };
