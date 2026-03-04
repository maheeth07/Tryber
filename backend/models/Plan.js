import mongoose from "mongoose";

const planSchema =new mongoose.Schema(
    {
        gym:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Gym",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        duration:{
            type:Number,//In days not in months
            required:true
        },
        description:{
            type:String,
        },
    },
    {
        timestamps:true
    }
);

const Plan=mongoose.model("Plan",planSchema);
export default Plan;