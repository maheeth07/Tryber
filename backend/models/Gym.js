import mongoose from "mongoose";

const gymSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        slug:{
            type:String,
            required:true,
            unique:true
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        location:{
            type:String
        },
        photos:[
            {
                type:String
            },
        ],
    },
    {timestamps:true}
);

const Gym=mongoose.model("Gym",gymSchema);
export default Gym;