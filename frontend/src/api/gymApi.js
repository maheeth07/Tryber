import API from "./axios";

export const getGyms=()=>API.get("/gyms");

export const createGym=(data)=>API.post("/gyms",data);