import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express'; 
import AuthRoute from './routes/AuthRoute.js';
import EditorRoute from './routes/CodeEditorController.js';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 8000;

// Create HTTP Server for WebSockets
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Routes
app.use('/api/Auth', AuthRoute);
app.use('/api/Code', EditorRoute);

// Initialize global code state
let code = ''; // ✅ Fix: Define a global code variable
let selectedLanguage = 'javascript';
let currentLanguage = selectedLanguage;

// Socket Connection Handling
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    // Send the latest code to the newly connected user
    socket.emit('updatedCode', code);

    // Send the current language to the newly connected user
    socket.emit('languageChange', selectedLanguage);
    // Listen for language changes from a user
    socket.on('languageChange', (selectedLanguage) => {
        currentLanguage = selectedLanguage; // ✅ Update language globally
        io.emit('languageChange', selectedLanguage); // ✅ Broadcast to all users
    });

    // Handle incoming code updates
    socket.on('updatedCode', (newCode) => {
        code = newCode; // Update global state
        socket.broadcast.emit('updatedCode', newCode);
    });

    socket.on('disconnect', () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

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
