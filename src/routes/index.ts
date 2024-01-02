import { Router } from 'express';
import userRouter from '@routes/user.route';
import postRouter from '@routes/post.route';

const router = Router();

router.use('/user', userRouter);
router.use('/post', postRouter);

export default router;
