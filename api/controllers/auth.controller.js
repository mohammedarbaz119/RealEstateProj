import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
const age = 1000*60*60*24*7;
export const register = async (req, res) => {
const {username,email,password} = req.body;
try{
const userexist = await prisma.user.findFirst({ 
    where:{
        OR:[{
            username
        },{
            email
        }]
    }
})!==null;
if(userexist){
    return res.status(400).json({"message":"username or email already exists" });
} 
const hashpassword = await bcrypt.hash(password,10);

    const user = await prisma.user.create({
        data:{
            username,
            email,
            password:hashpassword
        }
    });
    console.log(user);
    res.status(201).json({"message":"User created successfully"});
}
catch(err){
    res.status(500).json({"message":`failed to create user there is some server error please try again later`});
}
}  
export const login = async (req, res) => {
    try{
        const { usernameOrEmail, password } = req.body;
        let user;    
        if (req.body.isEmail) {
          user = await prisma.user.findUnique({where:{email:usernameOrEmail} });
        } else {
          user = await prisma.user.findUnique({ where:{username:usernameOrEmail} });
        }
        if(!user){
        return res.status(401).json({"message":"invalid username or password"});
       }
        const validpassword = await bcrypt.compare(password,user.password);
        if(!validpassword){
            return res.status(401).json({"message":"incorrect password"});
        }
        const {password:_,...rest} = user;
        const token = jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIn:age});
        res.cookie('token',token, {httpOnly:true}).status(200).json(rest);
    }
    catch(err){
        res.status(500).json({"message":`failed to login ${err.message}`});
    }

}
export const logout = async (req, res) => { 
    res.clearCookie('token').status(200).json({"message":"logout successful"});
}
