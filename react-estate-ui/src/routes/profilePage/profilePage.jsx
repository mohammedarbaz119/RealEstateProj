import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { useNavigate, Await } from "react-router-dom";
import "./profilePage.scss";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import { Suspense } from "react";
import { useState } from "react";
import SkeletonCard from "../../components/skeletonloader/SkeletonCard";
import SkeletonChat from "../../components/Cardloader/SkeletonChat";
import ApiRequest from "../../lib/AxiosConfig";

function ProfilePage() {
  const data = useLoaderData();
  const nav = useNavigate();
  const [chats,setChats] = useState([]);
  const { user, updateUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      nav("/login");
    }
  }, [user, nav]);

  const handleLogout = async () => {
    try {
      await ApiRequest.post("/auth/logout");
      updateUser(null);
      nav("/");
    }
    catch (err) {
      console.log(err);
    }
  };
  return (
    user &&
    (<div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={"/profile/update"}>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={user.avatar || "/noavatar.jpeg"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{user.username}</b>
            </span>
            <span>
              E-mail: <b>{user.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button><Link to={"/post/new"}>Create New Post</Link></button>
          </div>
          <Suspense fallback={<SkeletonCard/>}>
            <Await
              resolve={data.combinedposts}
              errorElement={<p>Error loading posts!</p>}
            >
              {(resp) =>{
                if(resp.data.posts.length === 0){
                  return <p>No posts found</p>
                }
                return <List listData={resp.data.posts} />
              }
                // <List listData={resp.data.posts} />
              }
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<SkeletonCard/>}>
            <Await
              resolve={data.combinedposts}
              errorElement={<p>Error loading posts!</p>}
            >
              {(resp) =>{
                if(resp.data.saved.length === 0){
                  return <p>No saved posts found</p>
                }
               return <List listData={resp.data.saved}/>
              }
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<SkeletonChat/>}>
            <Await
              resolve={data.chats}
              errorElement={<p>Error loading posts!</p>}
            >
              {(resp) =>{
                return <Chat chats={resp.data.chats}/>
              }
              }
            </Await>
          </Suspense>
        </div>
      </div>
    </div>)
  );
}

export default ProfilePage;

// import React, { Suspense, useEffect } from 'react';
// import { Link, useLoaderData, useNavigate, Await } from "react-router-dom";
// import axios from "axios";
// import { useAuthContext } from "../../context/AuthContext";
// import Chat from "../../components/chat/Chat";
// import List from "../../components/list/List";
// import SkeletonCard from "../../components/skeletonloader/SkeletonCard";
// import SkeletonChat from "../../components/Cardloader/SkeletonChat";
// import "./profilePage.scss";

// function ProfilePage() {
//   const data = useLoaderData();
//   const nav = useNavigate();
//   const { user, updateUser } = useAuthContext();

//   useEffect(() => {
//     if (!user) {
//       nav("/login");
//     }
//   }, [user, nav]);

//   const handleLogout = async () => {
//     try {
//       await axios.post("/api/auth/logout");
//       updateUser(null);
//       nav("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!user) return null;

//   return (
//     <div className="profilePage">
//       <div className="details">
//         <div className="wrapper">
//           <div className="section">
//             <h1 className="sectionTitle">User Information</h1>
//             <div className="info">
//               <div className="infoItem">
//                 <span className="label">Avatar:</span>
//                 <img src={user.avatar || "/noavatar.jpeg"} alt="User avatar" />
//               </div>
//               <div className="infoItem">
//                 <span className="label">Username:</span>
//                 <b>{user.username}</b>
//               </div>
//               <div className="infoItem">
//                 <span className="label">E-mail:</span>
//                 <b>{user.email}</b>
//               </div>
//             </div>
//             <div className="buttonGroup">
//               <Link to="/profile/update" className="button primary">Update Profile</Link>
//               <button onClick={handleLogout} className="button secondary">Logout</button>
//             </div>
//           </div>
//           <div className="section">
//             <h1 className="sectionTitle">My List</h1>
//             <Link to="/post/new" className="button primary">Create New Post</Link>
//             <Suspense fallback={<SkeletonCard />}>
//               <Await resolve={data.combinedposts} errorElement={<p>Error loading posts!</p>}>
//                 {(resp) => resp.data.posts.length === 0 ? <p>No posts found</p> : <List listData={resp.data.posts} />}
//               </Await>
//             </Suspense>
//           </div>
//           <div className="section">
//             <h1 className="sectionTitle">Saved List</h1>
//             <Suspense fallback={<SkeletonCard />}>
//               <Await resolve={data.combinedposts} errorElement={<p>Error loading posts!</p>}>
//                 {(resp) => resp.data.saved.length === 0 ? <p>No saved posts found</p> : <List listData={resp.data.saved} />}
//               </Await>
//             </Suspense>
//           </div>
//         </div>
//       </div>
//       <div className="chatContainer">
//         <div className="wrapper">
//           <Suspense fallback={<SkeletonChat />}>
//             <Await resolve={data.chats} errorElement={<p>Error loading chats!</p>}>
//               {(resp) => <Chat chats={resp.data.chats} />}
//             </Await>
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProfilePage;