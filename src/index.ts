import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { config } from './config/config';
import EnvData from './config/data/env-data';
import { connectDB } from './db/connect';
import router from './router';


const app = express();
config(); // Doing all the configuration

const PORT = EnvData.PORT;

app.use(cors({
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

const server = http.createServer(app);

server.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectDB();
});