import { Request, Response, NextFunction } from 'express';
import postModel from '@models/post.model';
import aws from 'aws-sdk';

const postService = {
  getPresignedUrl: async (fileName: string) => {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    });

    const presignedUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: process.env.AWS_BUCKET,
      Key: fileName,
      Expires: 30, // seconds
      ContentType: 'image/*',
    });

    return presignedUrl;
  },
};

export default postService;
