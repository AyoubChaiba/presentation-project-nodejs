import express from 'express';
import { register, login } from '../controller/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/auth/register', register);
authRouter.post('/auth/login', login);


export default authRouter