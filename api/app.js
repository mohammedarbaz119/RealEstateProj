import express from "express";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import postrouter from './routes/post.route.js';
import authrouter from './routes/auth.route.js';
import testRouter from './routes/test.route.js';
import userRouter from './routes/user.route.js';
import Chatrouter from "./routes/chat.route.js";
import Messagerouter from "./routes/message.route.js";
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/api/posts',postrouter);
app.use('/api/chats',Chatrouter);
app.use("/api/messages",Messagerouter);
app.use('/api/auth',authrouter);
app.use('/api/test',testRouter);
app.use("/api/users",userRouter);


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});