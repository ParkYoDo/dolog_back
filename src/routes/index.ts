import { Router } from 'express';
import authRouter from './auth.route';
import postRouter from './post.route';

const router = Router();

router.get('/', (req, res) => {
  return res.json('Hello');
});
router.use('/auth', authRouter);
router.use('/post', postRouter);

export default router;
