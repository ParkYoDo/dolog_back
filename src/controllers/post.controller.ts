import { Request, Response, NextFunction } from 'express';
import postService from '@services/post.service';

const postController = {
  test1: async (req: Request, res: Response, next: NextFunction) => {
    const users = await postService.getUsers();
    res.status(200).json(users);
  },
  test2: async (req: Request, res: Response, next: NextFunction) => {
    res.send('POST_ROUTER : test2');
  },
};

export default postController;
