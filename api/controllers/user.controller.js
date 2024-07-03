import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => { 
    try{
        const users = await prisma.user.findMany();
        res.status(200).json({users});
    }
    catch(err){
        res.status(500).json({message:"failed to get  all users"});
    }
  };
export const getUser = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id } })
        const { password, ...rest } = user;
        res.status(200).json({ user: rest});
    }
    catch(err){
        res.status(500).json({message:"failed to get user"});
    }
  };

export const updateUser = async (req, res) => {
    try{
        const  {id} = req.params;
        if(req.userId !== id){
            return res.status(403).json({message:"Unauthorized"});
        }
        const {password,avatar, ...rest} = req.body;
        if(password){
            const hashpassword = await bcrypt.hash(password,10);
            rest.password = hashpassword;
        }
        if(avatar){
            rest.avatar = avatar;
        }

        const updateduser =await prisma.user.update({where:{id},data:rest});
        const {password:_,...user} = updateduser;

        res.status(200).json({ user: user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"failed to update user"});
    }
  };
export const deleteUser =async (req, res) => {
    try{
        const  {id} = req.params;
        if(req.userId !== id){
            return res.status(403).json({message:"Unauthorized"});
        }
        const user =await prisma.user.delete({where:{id}});
        res.status(200).json({ message: "deleted user" });
    } 
    catch(err){
        res.status(500).json({message:"failed to delete user"});
    }
  };    

export const savePost = async(req, res) => {
    const {postId} = req.body;
    const userId = req.userId;
    try{
        const savedPost = await prisma.savedPost.findUnique({
            where:{
               userId_postId:{
                     userId,
                     postId
               }
            }
        });
        if(savedPost){
            await prisma.savedPost.delete({
                where:{
                    userId_postId:{
                        userId,
                        postId
                    }
                }
            });
            res.status(200).json({message:"post unsaved"});
        }
        else{
            await prisma.savedPost.create({
                data:{
                    userId,
                    postId
                }
            });
            res.status(201).json({message:"post saved"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"failed to save post"});
    }
  };

  export const getProfilePosts = async(req, res) => {
    try{
        const userId = req.userId;
        const madebyUserposts = await prisma.post.findMany({where:{userId}});
        const saved = await prisma.savedPost.findMany({where:{userId},include:{post:true}});
        res.status(200).json({posts:madebyUserposts,saved:saved});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"failed to get profile posts"});
    }
  }

