import { Router } from 'express';
import postController from '@controllers/post.controller';

const postRouter = Router();

postRouter.get('/presigned-url', postController.getPresignedUrl);

export default postRouter;
