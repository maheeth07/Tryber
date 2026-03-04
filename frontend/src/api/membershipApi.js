import API from './axios';


console.log(API.defaults.baseURL);

export const createMembership = (data) =>
    API.post("/memberships", data);

export const getOwnerMemberships = (data) =>
    API.get("/memberships/owner");

export const approveMembership = (data) =>
    API.patch("/memberships/approve", data);

export const getMembershipsByMember = (email) =>
    API.get(`/memberships/check/${email}`);

