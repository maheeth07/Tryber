import API from './axios';

export const loginOwner = (data) => {
    return API.post("/auth/login", data);
}

export const registerUser = (data) => {
    return API.post("/auth/register", data);
}
