import express from "express";
import cors from "cors";

import userRoutes from "./routes/Users.js";
import uiTextsRoutes from "./routes/uiTexts.js";
import termRoutes from "./routes/Terms.js";
import priceListRoutes from "./routes/PriceList.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Headers"],
  })
);

app.use(express.json());

app.use("/users", userRoutes);
app.use("/ui", uiTextsRoutes);
app.use("/terms", termRoutes);
app.use("/priceList", priceListRoutes);

export default app;
