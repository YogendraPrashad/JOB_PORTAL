import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { createJobsController, deleteJobController, getAllJobsController, jobsStatsController, updateJobController } from "../controllers/jobsController.js";

const router = express.Router();

// routes
// create jobs||post
router.post("/create-job", userAuth, createJobsController );

// get jobs || GET
router.get("/get-job", userAuth, getAllJobsController);

// update jobs || put or patch
router.patch("/update-job/:id", userAuth, updateJobController);


// Delete jobs ||  DELETE
router.delete("/delete-job/:id", userAuth, deleteJobController);


// Stats filter jobs ||  GET
router.get("/job-stats", userAuth, jobsStatsController);

export default router;