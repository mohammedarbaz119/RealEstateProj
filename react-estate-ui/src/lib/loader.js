import ApiRequest from "./AxiosConfig.js";
import { defer } from "react-router-dom";
export const LoadSingle = async ({params})=>{
    try{
        if(!params.id){
            return {post:"error",isSaved:false};
        }
        const res = await ApiRequest.get(`/posts/${params.id}`);
        return res.data
    }
    catch(err){
        return {post:"error",isSaved:false};        
    }
   
}

export const LoadAll = async ({request,params})=>{
    const query= request.url.split("?")[1];
    const postResponse =ApiRequest.get(`/posts?${query}`);
    return defer({
        resp: postResponse,
    });
}
export const ProfilePostsLoader = async ({params})=>{
    const res = ApiRequest.get(`/users/profilePosts`,{withCredentials:true });
    return defer({
        combinedposts: res,
    })
}

export const ChatsLoader = async ()=>{
    const res2 = (await ApiRequest.get(`/chats`,{withCredentials:true})).data.chats;
    return res2
}