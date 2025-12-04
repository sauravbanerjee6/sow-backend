import express from "express";
const router = express.Router();

import uiTextsControllers from "../controllers/uiTexts.js";

router.get("/", uiTextsControllers.getUiTexts);

export default router;
