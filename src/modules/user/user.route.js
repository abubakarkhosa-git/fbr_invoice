import { Router } from "express";
import { login, forgotpassword, resetpassword } from "./user.controller.js";



const router=Router();

router.post("/login", login);
router.post("/forgot-password", forgotpassword)
router.post("/reset-password/:token", resetpassword)

export default router;