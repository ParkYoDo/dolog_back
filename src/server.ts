import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import onConnectMongoDB from '@models/index';
import router from '@routes/index';
import cookieParser from 'cookie-parser';

dotenv.config();
// MongoDB 연결
onConnectMongoDB();

const app: Application = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [process.env.DEV_BASE_URL!, process.env.PROD_BASE_URL!],
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
