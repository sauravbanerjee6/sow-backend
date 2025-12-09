import express from "express";
import userController from "../controllers/Users.js";
const router = express.Router();

router.post("/createUser", userController.createUser);
router.post("/login", userController.login);

export default router;
