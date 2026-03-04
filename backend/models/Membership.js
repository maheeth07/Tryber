import mongoose from "mongoose";

const membershipSchema=new mongoose.Schema(
    {
        gym:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Gym",
            required:true
        },
        plan:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Plan",
            required:true
        },
        memberName:{
            type:String,
            required:true
        },
        memberEmail:{
            type:String,
            required:true
        },
        startDate:{
            type:Date,
            required:true
        },
        endDate:{
            type:Date,
            required:true,
        },
        paymentType:{
            type:String,
            enum:["online","cash"],
            required:true
        },
        status:{
            type:String,
            enum:["Active","Pending","Expired"],
            default:"Pending"
        },
    },
    {timestamps:true}
);

const Membership=mongoose.model("Membership",membershipSchema);

export default Membership;