import express from "express";
import { loginController, registerController } from "../controllers/authController.js";

const router = express.Router();

// Route
// Register ||POST
router.post("/register", registerController);

// login||post
router.post("/login",loginController)


export default router;