import { useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotifStore } from "../../lib/NotificationStore";
import ApiRequest from "../../lib/AxiosConfig";

function Navbar() {
  const notifications = useNotifStore((state) => state.Notifications);
  const [open, setOpen] = useState(false);
  const { user, updateUser } = useAuthContext();
  const nav = useNavigate();
  const fetchnotifications = useNotifStore((state) => state.fetchnotifs);
  if(user){
    fetchnotifications();
  }

  const handleLogout = async () => {
    try {
      await ApiRequest.post("/auth/logout");
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
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/agents"}>Agents</Link>
      </div>
      <div className="right">
      {user ? (
          <div className="user">
            <img src={user.avatar || "/noavatar.jpeg"} alt="" />
            <span>{user.username}</span>
            <Link to="/profile" className="profile">
             {notifications>=1&&<div className="notification">{notifications}</div>}
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
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
        <Link to={"/agents"}>Agents</Link>
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
