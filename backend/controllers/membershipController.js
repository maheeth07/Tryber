import Membership from "../models/Membership.js";
import Plan from "../models/Plan.js";
import Gym from "../models/Gym.js";

export const createMembership=async (req,res)=>{
    try{
        const {gymSlug,planName,memberName,memberEmail,paymentType}=req.body;
        const gym=await Gym.findOne({slug:gymSlug});
        if(!gym)
        {
            return res.status(404).json({message:"Gym not found"});
        }
        const plan=await Plan.findOne({name:planName,gym:gym._id});
        if(!plan)
        {
            return res.status(404).json({message:"Plan not found"});
        }

        const exisitingMembership=await Membership.findOne({
            gym:gym._id,
            memberEmail:memberEmail.toLowerCase(),
            status:{$in:["Active","Pending"]},
        });

        if(exisitingMembership)
        {
            return res.status(400).json({message:"Membership already exists for this email"});
        }

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + Number(plan.duration));
        const status=paymentType==="online"?"Active":"Pending";
        const membership=await Membership.create({
            gym:gym._id,
            plan:plan._id,
            memberName,
            memberEmail,
            startDate,
            endDate,
            paymentType,
            status
        });
        res.status(201).json(membership);
    }
    catch(error)
    {
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
};

export const getMembershipsByGym=async(req,res)=>{
    try{
        const {gymSlug}=req.params;
        const gym=await Gym.findOne({slug:gymSlug});
        if(!gym)
        {
            return res.status(404).json({message:"Gym not found"});
        }
        const memberships=await Membership.find({gym:gym._id}).populate("plan","name duration price")
        res.json(memberships)
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server error"});
    }
};

export const getMembershipsByMember = async (req, res) => {
  try {
    const { email } = req.params;

    const memberships = await Membership.find({
      memberEmail: email.toLowerCase(),
    })
      .populate("plan", "name duration price")
      .populate("gym", "name slug");

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedMemberships = await Promise.all(
      memberships.map(async (m) => {
        const endDate = new Date(m.endDate);
        endDate.setHours(0, 0, 0, 0);

        const diffTime = endDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Auto mark expired
        if (daysLeft <= 0 && m.status !== "Expired") {
          m.status = "Expired";
          await m.save();
        }

        return {
          ...m.toObject(),
          status: daysLeft <= 0 ? "Expired" : m.status,
          daysLeft: daysLeft > 0 ? daysLeft : 0,
        };
      })
    );

    res.json(updatedMemberships);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const approveMembership=async(req,res)=>{
    try{
        
        const {gymSlug,memberEmail,planName}=req.body;
        
        console.log("REQ USER:", req.user.id);
const gym=await Gym.findOne({slug:gymSlug});
        if(!gym)
        {
            return res.status(404).json({message:"Gym not found"});
        }
console.log("GYM OWNER:", gym.owner.toString());
        if(gym.owner.toString() !== req.user.id){
            return res.status(403).json({message:"Not your gym"});
        }
        const plan=await Plan.findOne({
            name:planName,
            gym:gym._id
        });
        if(!plan)
        {
            return res.status(404).json({message:"Plan not found"});
        }
        const membership=await Membership.findOne({gym:gym._id,plan:plan._id,memberEmail,status:"Pending"});
        if(!membership)
        {
            return res.status(404).json({message:"Membership not found"});
        }
        membership.status="Active";
        await membership.save();
        res.json({
            message:"Membership Approved",
            membership,
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
};

export const getOwnerMemberships=async(req,res)=>{
    try{
        const gym=await Gym.findOne({owner:req.user.id});
        if(!gym)
        {
            return res.status(404).json({message:"Gym not found"});
        }
        const memberships=await Membership.find({gym:gym._id}).populate("plan","name duration price").sort({endDate:1});
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const updatedMemberships=await Promise.all(
            memberships.map(async(m)=>{
                const endDate = new Date(m.endDate);
                endDate.setHours(0, 0, 0, 0);
                const diffTime = endDate - today;
                const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if(daysLeft<0&&m.status!=="Expired")
                {
                    m.status="Expired";
                    await m.save();
                }
            return{
                ...m.toObject(),
                status:daysLeft<=0?"Expired":m.status,
                daysLeft:daysLeft>0?daysLeft:0,
            };
        })
    );
        res.json(updatedMemberships);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server error"});
    }
};