import { Router } from 'express';
import postController from '@controllers/post.controller';

const router = Router();

router.get('/test1', postController.test1);

router.get('/test2', postController.test2);

export default router;
