import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";

// Create Jobs...........
export const createJobsController = async (req,res,next) => {
    const {position , company} = req.body;
    if(!company || !position){
        next('please provide all fields');
    }
    req.body.createdBy = req.user.userId;
    const job = await jobsModel.create(req.body);
    res.status(201).json({job});
};

// Get Jobs///...........

export const getAllJobsController = async (req,res,next) =>{
    const jobs = await jobsModel.find({createdBy:req.user.userId});
    res.status(200).json({
        totalJobs : jobs.length,
        jobs
    })

};

// update jobs

export const updateJobController = async (req,res,next) =>{
    const{id} = req.params;
    const{company, position} = req.body;
    // validation
    if(!company || !position){
        next('please provide all fields');
    }
    // find job
    const job = await jobsModel.findOne({_id : id});
    if(!job){
    next(`no jobs found with this id ${id}`);
    }
    if(!req.user.userId === job.createdBy?.toString()){
        
         next('you ar not authorized to update the jobs');
         return;

    }
    const updateJob= await jobsModel.findOneAndUpdate({_id:id}, req.body,{
        new:true,
        runValidators:true
    });
    res.status(200).json({updateJob});
};

// Delete jobs

export const deleteJobController = async(req,res,next) => {
    const {id} = req.params;

    // find job
    const job = await jobsModel.findOne({_id:id});
    if(!job){
        next(`no job find with this id ${id}`);
    }
    if(!req.user.userId === job.createdBy?.toString()){
        next('you ar not authorised to delete this job');
        return
    }
    await job.deleteOne();
    res.status(200).json({message:"job deleted"})
};

// Jobs Stats & Filters...
export const jobsStatsController = async (req,res) => {
    const stats = await jobsModel.aggregate([
        // search by users job
        {
            $match:{
                createdBy : new mongoose.Types.ObjectId(req.user.userId)
            },
        },
    ]);
    res.status(200).json({stats});
};

