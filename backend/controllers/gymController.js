import Gym from '../models/Gym.js'

export const createGym=async(req,res)=>{
    try{
        const {name,location}=req.body
        let baseSlug = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g,"-");
        let slug = baseSlug;
        let counter = 1;
        while(await Gym.findOne({slug})){
            slug = `${baseSlug}-${counter}`;
            counter++;
        }const gym=await Gym.create({
            name,
            location,
            slug,
            owner:req.user.id
        })
        res.status(201).json(gym);
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
}

export const getGyms=async(req,res)=>{
    try{
        const gyms=await Gym.find()
        res.status(200).json(gyms)
    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({message:'Server Error'})
    }
}


export const getGymBySlug=async(req,res)=>{
    try{
        const {slug}=req.params
        const gym=await Gym.findOne({slug});
        if(!gym)
        {
            return res.status(404).json({message:"Gym not found"});
        }
        res.json(gym);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}