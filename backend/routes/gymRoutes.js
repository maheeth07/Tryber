import express from 'express';
import {createGym} from "../controllers/gymController.js";
import {getGyms} from "../controllers/gymController.js"
import { getGymBySlug } from '../controllers/gymController.js';
import { protect,ownerOnly } from '../middleware/authMiddleware.js';
const router=express.Router();

router.post("/",protect,ownerOnly,createGym);
router.get("/",getGyms);
router.get("/:slug",getGymBySlug);
export default router;