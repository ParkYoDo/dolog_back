import { Request, Response, NextFunction } from 'express';
import postService from '@services/post.service';

const postController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    const users = await postService.getUsers(req, res, next);
    console.log(users);
    res.status(200).json(users);
  },
};

export default postController;
