import express from "express";
import { approveMembership, createMembership, getMembershipsByGym, getMembershipsByMember, getOwnerMemberships } from "../controllers/membershipController.js";
import { protect, ownerOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createMembership);
router.get("/gym/:gymSlug", getMembershipsByGym);
router.patch("/approve", protect, ownerOnly, approveMembership);
router.get("/owner", protect, ownerOnly, getOwnerMemberships);
router.get("/check/:email",getMembershipsByMember)

export default router;