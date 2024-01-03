import { Router } from 'express';
import postRouter from '@routes/post.route';

const router = Router();

router.use('/post', postRouter);

export default router;
