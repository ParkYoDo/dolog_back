import { Router } from 'express';
import postController from '@controllers/post.controller';
import postModel from '@models/post.model';

const router = Router();

router.get('/create', postController.create);

export default router;
