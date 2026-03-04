import API from "./axios";

export const getPlansByGym=(slug)=>{return API.get(`/plans/gym/${slug}`);};

export const getOwnerPlans=()=>{return API.get("/plans/owner");};

export const createPlan=(data)=>{return API.post("/plans",data);};

export const getPlanById=(planId)=>{return API.get(`/plans/${planId}`);};