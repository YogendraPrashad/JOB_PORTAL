import mongoose from "mongoose";
import Color from "color";

const connectDB = async ()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to mongodb database ${mongoose.connection.host}`);
    } catch(error){
        console.log(`MongoDB Error ${error}.bgRed.white`)
    }
};
export default connectDB;