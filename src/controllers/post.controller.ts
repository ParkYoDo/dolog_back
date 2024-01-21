import { Request, Response, NextFunction } from 'express';
import postService from '@services/post.service';

const postController = {
  getPresignedUrl: async (req: Request, res: Response, next: NextFunction) => {
    const fileName = String(req.query.fileName);
    const presignedUrl = await postService.getPresignedUrl(fileName);

    res.status(200).json(presignedUrl);
  },
};

export default postController;
