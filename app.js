import express from "express";
import cors from "cors";

import userRoutes from "./routes/Users.js";

const app = express();

app.use(
    cors({
        origin: 'https://localhost:5173',
        methods: ['GET','POST','PUT','DELETE','OPTIONS'],
        allowedHeaders: ['Content-Type','Headers']
    })
);

app.use(express.json());

app.use('/users',userRoutes);


export default app;


