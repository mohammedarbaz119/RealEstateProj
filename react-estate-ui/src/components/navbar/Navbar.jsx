// import { useState } from "react";
// import "./navbar.scss";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "../../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const {user,updateUser} = useAuthContext();
//   const nav = useNavigate();
//   const handleLogout = async () => {
//     try{
//      await axios.post("/api/auth/logout");
//      updateUser(null);
//      nav("/");
//     }
//      catch(err){
//        console.log(err);
//      }
//      // Your logout logic here
//    };

//   return (
//     <nav>
//       <div className="left">
//         <a href="/" className="logo">
//           <img src="/logo.png" alt="" />
//           <span>DreamEstate</span>
//         </a>
//         <a href="/">Home</a>
//         <a href="/">About</a>
//         <a href="/">Contact</a>
//         <a href="/">Agents</a>
//       </div>
//       <div className="right">
//         {user ? (
//           <div className="user">
//             <img
//               src={user.avatar || "/noavatar.jpeg"}
//               alt=""
//             />
//             <span>{user.username}</span>
//             <Link to="/profile" className="profile">
//               <div className="notification">3</div>
//               <span>Profile</span>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <Link href="/login">Sign in</Link>
//             <Link href="/register" className="register">
//               Sign up
//             </Link>
//           </>
//         )}
//         <div className="menuIcon">
//           <img
//             src="/menu.png"
//             alt=""
//             onClick={() => setOpen((prev) => !prev)}
//           />
//         </div>
//         <div className={open ? "menu active" : "menu"}>
//           <a href="/">Home</a>
//           <a href="/">About</a>
//           <a href="/">Contact</a>
//           <a href="/">Agents</a>
//           {user ? (
//             <button  onClick={handleLogout}>
//               Logout
//             </button>
//           ):
//           <>
//           <Link href="/login">Sign in</Link>
//           <Link href="/register">Sign up</Link>
//           </>
//           }
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
import { useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, updateUser } = useAuthContext();
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      updateUser(null);
      nav("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>DreamEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
      {user ? (
          <div className="user">
            <img src={user.avatar || "/noavatar.jpeg"} alt="" />
            <span>{user.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          {user ? (
            <>
            <button>
              <Link to="/profile">Profile</Link>
            </button>
            <button onClick={handleLogout}>
              Logout
            </button>
           </>
          ) : (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
