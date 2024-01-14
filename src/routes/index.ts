import { Router } from 'express';
import authRouter from './auth.route';
import postRouter from './post.route';

const router = Router();

router.get('/', (req, res) => {
  res.json('Do.log');
});

router.use('/auth', authRouter);
router.use('/post', postRouter);

export default router;
