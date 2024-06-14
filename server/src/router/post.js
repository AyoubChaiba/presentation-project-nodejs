import express from 'express';
import { auth } from "../middleware/authorization.js";
import { CreatPost, showPosts,  } from '../controller/post.controller.js';

const postRouter = express.Router();

postRouter.post('/post', auth , CreatPost);
postRouter.get('/post/all', auth , showPosts );

export default postRouter;