import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { addmessage } from '../controllers/message.controller.js';
const Messagerouter=express.Router();

Messagerouter.post('/:id',isAuth,addmessage);
// router.get('/:id',getPost);
// router.post('/',isAuth,createPost);
// router.put("/:id",isAuth,updatePost);
// router.delete('/:id',isAuth,deletePost);

export default Messagerouter;