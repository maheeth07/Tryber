import API from "./axios";

export const askBot = (question) =>
  API.post("/chat", { question });