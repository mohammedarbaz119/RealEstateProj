import ApiRequest from "./AxiosConfig.js";
import { defer } from "react-router-dom";
export const LoadSingle = async ({params})=>{
    const res = await ApiRequest.get(`/posts/${params.id}`);
    return res.data
}

export const LoadAll = async ({request,params})=>{
    const query= request.url.split("?")[1];
    const postResponse =ApiRequest.get(`/posts?${query}`);
    return defer({
        resp: postResponse,
    });
}
export const ProfilePostsLoader = async ({params})=>{
    const res = ApiRequest.get(`/users/profilePosts`);
    const res2 = ApiRequest.get(`/chats`);
    return defer({
        chats: res2,
        combinedposts: res,
    })
}