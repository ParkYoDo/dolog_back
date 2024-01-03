import { Router } from 'express';
import postRouter from '@routes/post.route';

const router = Router();

router.get('/', (req, res) => {
  res.json('Hello');
});

router.use('/post', postRouter);

export default router;
