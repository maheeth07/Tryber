import Plan from "../models/Plan.js"
import Gym from "../models/Gym.js"
export const createPlan=async(req,res)=>{
    try{
        const {gym,name,price,duration,description}=req.body
        // const slug=name.toLowerCase().replace(/\s+/g,"");
        const gymExists=await Gym.findOne({owner:req.user.id});
        if(!gymExists)
        {
            return res.status(404).json({message:"Gym not found"});
        }
        const plan=await Plan.create({
            gym:gymExists._id,
            name,
            price,
            duration,
            description
        })
        res.status(201).json(plan);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
};

export const getPlansByGym=async(req,res)=>{
    try{
        const {gymSlug}=req.params;
        const gym=await Gym.findOne({slug:gymSlug});
        if(!gym)
        {
            return res.status(404).json({message:"gym not found"});
        }
        const plans=await Plan.find({gym:gym._id});
        res.json(plans);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
};


export const getOwnerPlans=async(req,res)=>{
    try{
        const gym=await Gym.findOne({owner:req.user.id});
        if(!gym)
        {
            return res.status(404).json({message:"Gym not found"});
        }
        const plans=await Plan.find({gym:gym._id});
        res.json(plans);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server error"});
    }
};