import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { onConnectMongoDB } from './models';
import router from './routes';

dotenv.config();
// MongoDB 연결
onConnectMongoDB();

const app: Application = express();
var port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
