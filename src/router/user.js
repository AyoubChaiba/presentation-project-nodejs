import express from 'express';
import { getUser } from '../controller/user.controller.js';
import { authorization } from '../middleware/authorization.js';

const userRouter = express.Router();

userRouter.get('/user' , authorization, getUser);

export default userRouter