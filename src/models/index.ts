import mongoose from 'mongoose';

const onConnectMongoDB = () => {
  // 만일 배포용이 아니라면, 디버깅 on
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true); // 몽고 쿼리가 콘솔에서 뜨게 한다.
  }

  mongoose.connect(
    `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@cluster.5m7wvho.mongodb.net/?retryWrites=true&w=majority`,
  );
};

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB : connected');
});

db.on('disconnected', () => {
  console.log('MongoDB : disconnected');
  onConnectMongoDB();
});

db.on('reconnected', () => {
  console.log('MongoDB : reconnected');
});

db.on('reconnectFailed', () => {
  console.log('MongoDB : reconnectFailed');
});

db.on('error', error => {
  console.error(`MongoDB : ${error}`);
});

export default onConnectMongoDB;
