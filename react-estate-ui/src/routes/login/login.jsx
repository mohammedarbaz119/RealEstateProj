// import "./login.scss";
// import { Link } from "react-router-dom";

// function Login() {
//   return (
//     <div className="login">
//       <div className="formContainer">
//         <form>
//           <h1>Welcome back</h1>
//           <input name="username" type="text" placeholder="Username" />
//           <input name="password" type="password" placeholder="Password" />
//           <button>Login</button>
//           <Link to="/register">{"Don't"} you have an account?</Link>
//         </form>
//       </div>
//       <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.scss";
import { useAuthContext } from '../../context/AuthContext';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverMessage, setServerMessage] = useState({ type: "", content: "" });
  const navigate = useNavigate();
  const { user,updateUser } = useAuthContext();
  if(user){
  return <Navigate to="/profile" />
  }
  const onSubmit = async (data) => {
    try {
      setServerMessage({ type: "", content: "" }); // Clear any previous messages
      const response = await axios.post("/api/auth/login", data);
      updateUser(response.data);
      setServerMessage({ type: "success", content: "Login successful" });
      navigate("/"); // Adjust this to your app's post-login route;
    } catch (err) {
      console.error(err);
      if (err.response) {
        if (err.response.status === 401) {
          setServerMessage({ type: "error", content: "Invalid credentials." });
        } else {
          setServerMessage({ type: "error", content: err.response.data.message || "An error occurred during login." });
        }
      } else if (err.request) {
        setServerMessage({ type: "error", content: "No response from server. Please try again later." });
      } else {
        setServerMessage({ type: "error", content: "An unexpected error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Welcome back</h1>
          {serverMessage.content && (
            <div style={{
              color: serverMessage.type === "error" ? 'red' : 'green',
              marginBottom: '10px'
            }}>
              {serverMessage.content}
            </div>
          )}
          <input
            {...register("usernameOrEmail", {
              required: "Username or Email is required",
              validate: (value) => {
                if (value.includes('@')) {
                  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || 'Invalid email address';
                }
                return true;
              }
            })}
            type="text"
            placeholder="Username or Email"
          />
          {errors.usernameOrEmail && <span style={{ color: 'red' }}>{errors.usernameOrEmail.message}</span>}

          <input
            {...register("password", {
              required: "Password is required"
            })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}

          <button type="submit">Login</button>
          <Link to="/register">Don&apos;t have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
};

export default Login;