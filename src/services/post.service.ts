import { Request, Response, NextFunction } from 'express';
import postModel from '@models/post.model';

const postService = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    const post = await postModel.find({});
    return post;
  },
};

export default postService;
