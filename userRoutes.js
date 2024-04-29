import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { updateUserController } from "../controllers/userController.js";

// Router object
const router = express.Router();

// routes
// Get users || Get

// UPDATE USER || PUT

router.put("/update-user",userAuth, updateUserController);

export default router;

