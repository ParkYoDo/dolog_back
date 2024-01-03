import mongoose from 'mongoose';

const onConnectMongoDB = () => {
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
