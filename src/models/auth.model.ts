import mongoose, { Schema } from 'mongoose';

const authSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // comment: String,
});

const authModel = mongoose.model('Auth', authSchema);

export default authModel;
