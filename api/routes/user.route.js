import express from "express";
import {getUser, updateUser, deleteUser, savePost, getProfilePosts, getUsers } from "../controllers/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";
const router = express.Router();
router.get("/profilePosts",isAuth,getProfilePosts);
router.post("/save",isAuth,savePost);
router.post("/:id",isAuth,getUser);
router.get("/",isAuth,getUsers);
router.put("/:id", isAuth,updateUser);
router.delete("/:id", isAuth,deleteUser);

export default router;