import express from "express";
import pricelistControllers from "../controllers/PriceList.js";
const router = express.Router();

router.get("/", pricelistControllers.getPriceList);
router.put("/", pricelistControllers.updatePriceList);

export default router;
