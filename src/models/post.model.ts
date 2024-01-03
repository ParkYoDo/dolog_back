import mongoose, { Schema } from 'mongoose';

const {
  Types: { ObjectId },
} = Schema;

const postSchema = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
