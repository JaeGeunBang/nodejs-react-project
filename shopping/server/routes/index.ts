import express, { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import User from '../models/user'
import { authHandler } from "../middleware/auth";


export const indexRouter = express.Router() ;

indexRouter.get('/', async (req: Request, res: Response) => {
    res.status(200).send(req.cookies)
});
