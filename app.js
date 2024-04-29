// PACKAGES IMPORTS
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";


// FILES IMPORTS
import connectDB from "./config/db.js";

//ROUTES IMPORTS
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import jobsRoutes from "./routes/jobsRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
connectDB();

const app= express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/api/v1/test",testRoutes);
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/jobs",jobsRoutes);




app.use(errorMiddleware);

const PORT = process.env.PORT|| 8080
 app.listen(PORT,()=>{
    console.log(`server is running in ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgWhite)
 });