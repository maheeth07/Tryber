import Gym from "../models/Gym.js";
import Plan from "../models/Plan.js";
import Membership from "../models/Membership.js";
import User from "../models/User.js";


export const getOwnerDashboard=async(req,res)=>{
    try{
        // const user=await User.findById(req.user.id);
        // if(!user)
        // {
        //     return res.status(404).json({messahe:"User not found"});
        // }
        const gym=await Gym.findOne({owner:req.user._id});
        if(!gym)
        {
            return res.status(404).json({message:"Gym not found"});
        }
        const totalPlans=await Plan.countDocuments({gym:gym._id});
        const totalMembers=await Membership.countDocuments({gym:gym._id});
        const activeMembers=await Membership.countDocuments({
            gym:gym._id,
            status:"Active"
        });
        const pendingMembers=await Membership.countDocuments({
            gym:gym._id,
            status:"Pending"
        });
        const expiredMembers=await Membership.countDocuments({
            gym:gym._id,
            status:"Expired"
        });
        res.json({
            gym:{
                name:gym.name,
                slug:gym.slug,
                location:gym.location
            },
            stats:{
                totalPlans,
                totalMembers,
                activeMembers,
                pendingMembers,
                expiredMembers
            }
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server error"});
    }
};