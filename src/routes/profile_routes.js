import { Router } from "express";
import { getProfile, createProfile } from "../controller/profile_controller.js";
import authMiddleware from "../middleware/auth_middleware.js";

const router = Router();

router.get("/getProfile", authMiddleware, getProfile);
router.post("/createProfile", authMiddleware, createProfile);

export default router;
