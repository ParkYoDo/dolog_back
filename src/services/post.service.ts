import { Request, Response, NextFunction } from 'express';
import postModel from '@models/post.model';
import aws from 'aws-sdk';

const postService = {
  getPresignedUrl: async (fileName: string) => {
    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    });

    const s3 = new aws.S3();

    const presignedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.AWS_BUCKET,
      Key: `images/${fileName}`,
      Expires: 60 * 60,
    });

    console.log(presignedUrl);

    return presignedUrl;
  },

  uploadPost: async (data: any) => {
    return await postModel.create(data);
  },

  getPost: async () => {
    return await postModel.find();
  },

  getOnePost: async (postUrl: string) => {
    return await postModel.findOne({ url: postUrl });
  },
};

export default postService;
