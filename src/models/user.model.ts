import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  // _id 부분은 기본적으로 생략. 알아서 Object.id를 넣어줌
  name: {
    // notnull이나 유니크 인덱스 같은건 원래 몽고디비에는 해당 설정이 없음.
    // 몽구스에서 sql처럼 표현하기 위해 추가된 것!
    type: String,
    required: true, // null 여부
    unique: true, // 유니크 여부
  },
  age: {
    type: Number, //Int32가 아니다. 기본 자바스크립트에는 존재하지 않으니 Number
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String, // 옵션에 type 밖에 없을 때 간단하게 표현 가능
  createdAt: {
    type: Date,
    default: Date.now, // 기본값
  },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
