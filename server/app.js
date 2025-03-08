import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express'; 
import AuthRoute from './routes/AuthRoute.js';
import EditorRoute from './routes/EditorRoute.js';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js';
import cors from 'cors'

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [ 
        'http://localhost:5173' 
    ],
    credentials:true,
}));

// Routes
app.use('/api/Auth',AuthRoute);
app.use('/api/Code', EditorRoute);

const startServer = async() => {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(
                JSON.stringify({message: `Server connected on port ${PORT}`, status: "Success"})
            );
        });
    } catch(error) {
        console.error(
            JSON.stringify({ 
                message: "Failed to start server", 
                status:"Failed", 
                error:error.message
            })
        );
        process.exit(1); 
    }
};

startServer();