import { Router } from 'express';
import postController from '../controllers/post.controller';

const postRouter = Router();

postRouter.get('/presigned-url', postController.getPresignedUrl);
postRouter.post('/', postController.uploadPost);
postRouter.get('/', postController.getPost);
postRouter.get('/:postUrl', postController.getOnePost);

export default postRouter;
