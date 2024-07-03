import express from "express";
import { isAuth } from "../middleware/isAuth.js";
import { good } from "../controllers/test.controller.js";
const router = express.Router();

router.post("/should-be-logged-in", isAuth,good);

export default router;