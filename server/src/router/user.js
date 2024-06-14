import express from 'express';
import { user } from "../controller/user.controller.js";
import { auth } from "../middleware/authorization.js";

const userRouter = express.Router();


userRouter.get('/user', auth , user );

export default userRouter;