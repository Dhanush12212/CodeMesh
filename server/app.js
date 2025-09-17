import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express'; 
import AuthRoute from './routes/AuthRoute.js'; 
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io'; 
import socketHandler from './socket/socket.js';

const app = express();
const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ['http://localhost:5173'],
        credentials: true,
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[ 'http://localhost:5173'],
    credentials: true,
}));


app.use('/api/Auth', AuthRoute);  

// Socket setup
socketHandler(httpServer);

// Start Server
const startServer = async () => {
    try {
        await connectDB();
        httpServer.listen(PORT, '0.0.0.0', () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Server failed: ${error.message}`);
        process.exit(1);
    }
};

startServer();
