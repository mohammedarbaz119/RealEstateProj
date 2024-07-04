import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { addChat, getAllchats, getSinglechat, readChats,getAllunreadchatsnos, getHasChat } from '../controllers/chat.controller.js';

const Chatrouter=express.Router();
Chatrouter.get('/',isAuth,getAllchats);
Chatrouter.post("/haschat",isAuth,getHasChat);
Chatrouter.get('/get/notifications',isAuth,getAllunreadchatsnos);
Chatrouter.get('/:id',isAuth,getSinglechat);
Chatrouter.post('/',isAuth,addChat);
// Chatrouter.put("/:id",isAuth,updatePost);
Chatrouter.put('/read/:id',isAuth,readChats);
export default Chatrouter;