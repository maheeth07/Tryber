import express from "express";
import { getOwnerDashboard } from "../controllers/dashboardController.js";
import { protect,ownerOnly } from "../middleware/authMiddleware.js";

const router=express.Router();

router.get("/owner",protect,ownerOnly,getOwnerDashboard);
export default router;