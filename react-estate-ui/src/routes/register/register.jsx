// // import "./register.scss";
// // import { Link } from "react-router-dom";
// // import { useForm } from "react-hook-form";
// // import axios from "axios";
// // function Register() {
// //   const { register, handleSubmit, formState: { errors } } = useForm();

// //   const onSubmit = (data) => {
// //     console.log("Form data:", data);

// //     axios.post("/api/auth/register", data).then((res) => {
// //       console.log(res.data);
// //     }
// //     ).catch((err) => {
// //       console.log(err.response.data);
// //     });
    
// //   };

// //   return (
// //     <div className="register">
// //       <div className="formContainer">
// //         <form onSubmit={handleSubmit(onSubmit)}>
// //           <h1>Create an Account</h1>
// //           <input
// //             {...register("username", { required: "Username is required" })}
// //             type="text"
// //             placeholder="Username"
// //           />
// //           {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
          
// //           <input
// //             {...register("email", { 
// //               required: "Email is required",
// //               pattern: {
// //                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
// //                 message: "Invalid email address"
// //               }
// //             })}
// //             type="text"
// //             placeholder="Email"
// //           />
// //           {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          
// //           <input
// //             {...register("password", { 
// //               required: "Password is required",
// //               minLength: {
// //                 value: 6,
// //                 message: "Password must be at least 6 characters"
// //               }
// //             })}
// //             type="password"
// //             placeholder="Password"
// //           />
// //           {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          
// //           <button type="submit">Register</button>
// //           <Link to="/login">Do you have an account?</Link>
// //         </form>
// //       </div>
// //       <div className="imgContainer">
// //         <img src="/bg.png" alt="" />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Register;
// import React, { useState } from "react";
// import "./register.scss";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Register() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [serverMessage, setServerMessage] = useState({ type: "", content: "" });
// const nav = useNavigate();
//   const onSubmit = async (data) => {
//     try {
//       setServerMessage({ type: "", content: "" }); // Clear any previous messages
//       const response = await axios.post("/api/auth/register", data);
//       setServerMessage({ type: "success", content: "User created successfully" });
// setTimeout(() => {  
//   nav("/login");
// }, 150);

//     } catch (err) {
//       if (err.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         if (err.response.status === 400) {
//           setServerMessage({ type: "error", content: "Username or email already exists." });
//         } else {
//           setServerMessage({ type: "error", content: err.response.data.message || "An error occurred during registration." });
//         }
//       } else if (err.request) {
//         // The request was made but no response was received
//         setServerMessage({ type: "error", content: "No response from server. Please try again later." });
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setServerMessage({ type: "error", content: "An unexpected error occurred. Please try again." });
//       }
//     }
//   };

//   return (
//     <div className="register">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <h1>Create an Account</h1>
//           {serverMessage.content && (
//             <div style={{ 
//               color: serverMessage.type === "error" ? 'red' : 'green', 
//               marginBottom: '10px' 
//             }}>
//               {serverMessage.content}
//             </div>
//           )}
//           <input
//             {...register("username", { required: "Username is required" })}
//             type="text"
//             placeholder="Username"
//           />
//           {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
          
//           <input
//             {...register("email", { 
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Invalid email address"
//               }
//             })}
//             type="text"
//             placeholder="Email"
//           />
//           {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          
//           <input
//             {...register("password", { 
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters"
//               }
//             })}
//             type="password"
//             placeholder="Password"
//           />
//           {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}

          
//           <button type="submit">Register</button>
//           <Link to="/login">Do you have an account?</Link>
//         </form>
//       </div>
//       <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Register;



// import React, { useState } from "react";
// import "./register.scss";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CloudinaryUploadWidget from "../../components/uploadWidget/CloudinaryUploadWidget";

// function Register() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [serverMessage, setServerMessage] = useState({ type: "", content: "" });
//   const [avatar, setAvatar] = useState(null);
//   const nav = useNavigate();

//   const onSubmit = async (data) => {
//     try {
//       setServerMessage({ type: "", content: "" });
//       if (avatar) {
//         data.avatar = avatar;
//       }
//       const response = await axios.post("/api/auth/register", data);
//       setServerMessage({ type: "success", content: "User created successfully" });
//       setTimeout(() => {  
//         nav("/login");
//       }, 150);
//     } catch (err) {
//       if (err.response) {
//         if (err.response.status === 400) {
//           setServerMessage({ type: "error", content: "Username or email already exists." });
//         } else {
//           setServerMessage({ type: "error", content: err.response.data.message || "An error occurred during registration." });
//         }
//       } else if (err.request) {
//         setServerMessage({ type: "error", content: "No response from server. Please try again later." });
//       } else {
//         setServerMessage({ type: "error", content: "An unexpected error occurred. Please try again." });
//       }
//     }
//   };

//   return (
//     <div className="register">
//       <div className="formContainer">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <h1>Create an Account</h1>
//           {serverMessage.content && (
//             <div style={{ 
//               color: serverMessage.type === "error" ? 'red' : 'green', 
//               marginBottom: '10px' 
//             }}>
//               {serverMessage.content}
//             </div>
//           )}
//           <input
//             {...register("username", { required: "Username is required" })}
//             type="text"
//             placeholder="Username"
//           />
//           {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
          
//           <input
//             {...register("email", { 
//               required: "Email is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Invalid email address"
//               }
//             })}
//             type="text"
//             placeholder="Email"
//           />
//           {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          
//           <input
//             {...register("password", { 
//               required: "Password is required",
//               minLength: {
//                 value: 6,
//                 message: "Password must be at least 6 characters"
//               }
//             })}
//             type="password"
//             placeholder="Password"
//           />
//           {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          
//           <div onClick={(e) => e.preventDefault()}>
//             <CloudinaryUploadWidget
//               uwConfig={{
//                 cloudName: "dgvc5f1gr",
//                 uploadPreset: "Estate",
//                 multiple: false,
//                 maxImageFileSize: 2000000,
//                 folder: "avatars",
//               }}
//               setavatar={setAvatar}
//             />
//           </div>
          
//           {avatar && (
//             <div>
//               <img 
//                 src={avatar} 
//                 alt="User avatar" 
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                   marginBottom: "10px",
//                 }} 
//               />
//               <button
//                 type="button"
//                 onClick={() => setAvatar(null)}
//                 style={{
//                   backgroundColor: "#dc3545",
//                   color: "white",
//                   padding: "10px",
//                   fontSize: "16px",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   marginTop: "10px",
//                 }}
//               >
//                 Remove Image
//               </button>
//             </div>
//           )}
          
//           <button type="submit">Register</button>
//           <Link to="/login">Do you have an account?</Link>
//         </form>
//       </div>
//       <div className="imgContainer">
//         <img src="/bg.png" alt="" />
//       </div>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../../components/uploadWidget/CloudinaryUploadWidget";

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverMessage, setServerMessage] = useState({ type: "", content: "" });
  const [avatar, setAvatar] = useState(null);
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerMessage({ type: "", content: "" });
      if (avatar) {
        data.avatar = avatar;
      }
      const response = await axios.post("/api/auth/register", data);
      setServerMessage({ type: "success", content: "User created successfully" });
      setTimeout(() => {  
        nav("/login");
      }, 150);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setServerMessage({ type: "error", content: "Username or email already exists." });
        } else {
          setServerMessage({ type: "error", content: err.response.data.message || "An error occurred during registration." });
        }
      } else if (err.request) {
        setServerMessage({ type: "error", content: "No response from server. Please try again later." });
      } else {
        setServerMessage({ type: "error", content: "An unexpected error occurred. Please try again." });
      }
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Create an Account</h1>
          {serverMessage.content && (
            <div style={{ 
              color: serverMessage.type === "error" ? 'red' : 'green', 
              marginBottom: '10px' 
            }}>
              {serverMessage.content}
            </div>
          )}
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Username"
          />
          {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
          
          <input
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="text"
            placeholder="Email"
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
          
          <input
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
          
          <div  onClick={e=>e.preventDefault()} className="avatar-upload-container" >
            <CloudinaryUploadWidget
              uwConfig={{
                cloudName: "dgvc5f1gr",
                uploadPreset: "Estate",
                multiple: false,
                maxImageFileSize: 2000000,
                folder: "avatars",
              }}
              setavatar={setAvatar}
            />
            
            {avatar && (
              <div className="avatar-preview">
                <img 
                  src={avatar} 
                  alt="User avatar" 
                  className="avatar-image"
                />
                <button
                  type="button"
                  onClick={() => setAvatar(null)}
                  className="remove-avatar-btn"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          
          <button type="submit">Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;