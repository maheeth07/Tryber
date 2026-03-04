import express from "express";
import { simpleChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", simpleChat);

export default router;