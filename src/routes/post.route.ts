import { Router } from 'express';
import postController from '@controllers/post.controller';

const postRouter = Router();

postRouter.get('/create', postController.create);

export default postRouter;
