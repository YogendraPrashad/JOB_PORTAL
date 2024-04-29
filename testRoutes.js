import express from "express";
import { testPostController } from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

// router obj
const router = express.Router();


// routers
router.post("/test-post", userAuth, testPostController)



export default router;