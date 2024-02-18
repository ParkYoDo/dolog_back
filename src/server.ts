import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import onConnectMongoDB from './models';
import router from './routes';

dotenv.config();
// MongoDB 연결
onConnectMongoDB();

const app: Application = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:8081',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
