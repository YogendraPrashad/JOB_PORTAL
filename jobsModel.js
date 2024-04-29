import mongoose from "mongoose";
// import { required } from "nodemon/lib/config";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true,'Company name  is require'],
    },
    position:{
        type:String,
        required:[true,'Job position is required'],
        maxlength:100
    },
    status:{
        type:String,
        enum:['pending','reject','interview'],
        default:'pending'

    },
    workType:{
        type:String,
        enum:['full-time','part-time','internship','contract'],
        default:'full-time'
    },
    workLocation:{
        type:String,
        default:'dehradun',
        required:[true, 'work location is  required']
    },
    createdBy:{
        type : mongoose.Types.ObjectId,
        ref: 'User'
    }

},{timestamps:true});

export default mongoose.model('Job', jobSchema);