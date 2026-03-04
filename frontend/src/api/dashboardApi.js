import API from "./axios";

export const getOwnerDashboard = () =>
  API.get("/dashboard/owner", {
    headers: {
      "Cache-Control": "no-cache"
    }
  });