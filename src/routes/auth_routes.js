import { Router } from "express";
import { login, register } from "../controller/auth_controller.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/reg", upload.single("file"), register);
router.post("/log", login);

export default router;
