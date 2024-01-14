import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import onConnectMongoDB from '@models/index';
import router from '@routes/index';

dotenv.config();
// MongoDB 연결
onConnectMongoDB();

const app: Application = express();
var port = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:8081',
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
