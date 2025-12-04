import express from "express";
const router = express.Router();

import termControllers from "../controllers/Terms.js";

router.get("/", termControllers.getTerms);

export default router;
