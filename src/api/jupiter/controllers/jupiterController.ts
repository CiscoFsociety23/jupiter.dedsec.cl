import express, { Router, Request, Response } from "express";
import { JupiterService } from "../services/jupiterService";
import { serviceInformation } from "../interfaces/controllers/informationsInterface";

const jupiterController: Router = express.Router();
const jupiterService: JupiterService = new JupiterService();

jupiterController.get('/', async (req: Request, res: Response) => {
    try {
        const getStatus: serviceInformation = await jupiterService.getServiceStatus();
        res.json(getStatus);
    } catch (error) {
        console.log(`[error]: ${error}`);
        res.json({ status: false });
    };
});

export { jupiterController };
