import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { createPost, getAllposts, getPost, updatePost,deletePost } from '../controllers/post.controller.js';

const router=express.Router();

router.get('/',getAllposts);
router.get('/:id',getPost);
router.post('/',isAuth,createPost);
router.put("/:id",isAuth,updatePost);
router.delete('/:id',isAuth,deletePost);

export default router;