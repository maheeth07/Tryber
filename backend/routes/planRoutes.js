import express from "express";
import {createPlan,getPlansByGym} from "../controllers/planController.js";
import { protect,ownerOnly } from "../middleware/authMiddleware.js";
import { getOwnerPlans } from "../controllers/planController.js";
import Plan from "../models/Plan.js";

const router=express.Router();

router.post("/",protect,ownerOnly,createPlan);
router.get("/gym/:gymSlug",getPlansByGym)
// router.post("/",,createPlan)
router.get("/owner",protect,ownerOnly,getOwnerPlans);
router.get("/:id", async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;