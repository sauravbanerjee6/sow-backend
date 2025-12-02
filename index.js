import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: 'https://localhost:5173',
        methods: ['GET','POST','PUT','DELETE','OPTIONS'],
        allowedHeaders: ['Content-Type','Headers']
    })
);

app.use(express.json());

app.listen(3000, () => {
  console.log("listening on port 3000!");
});

export default app;
