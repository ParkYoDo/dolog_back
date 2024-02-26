import { Request, Response, NextFunction } from 'express';
import postService from '@services/post.service';

const postController = {
  getPresignedUrl: async (req: Request, res: Response, next: NextFunction) => {
    const fileName = String(req.query.fileName);
    const presignedUrl = await postService.getPresignedUrl(fileName);

    res.status(200).json(presignedUrl);
  },
  uploadPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await postService.uploadPost(req.body);
      console.log(result);
      return res.status(200).json({ message: '글을 작성하였습니다.', data: result });
    } catch (error) {
      console.log(error);
    }
  },

  getOnePost: async (req: Request, res: Response, next: NextFunction) => {
    const { postUrl } = req.params;

    try {
      const result = await postService.getOnePost(postUrl);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  },

  getPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await postService.getPost();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  },
};

export default postController;
