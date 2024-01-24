import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  autor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Auth',
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  thumbnailImage: String,
  thumbnailText: String,
  url: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
