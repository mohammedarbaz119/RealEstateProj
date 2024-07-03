import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import validateUsernameOrEmail from "../middleware/isEmail.js";
const router = express.Router();

router.post("/register", register);
router.post("/login",validateUsernameOrEmail, login);
router.post("/logout", logout);

export default router;
