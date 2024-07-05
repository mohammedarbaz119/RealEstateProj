import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from "../../context/AuthContext";
import "./profileUpdatePage.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CloudinaryUploadWidget from "../../components/uploadWidget/CloudinaryUploadWidget"
import ApiRequest from '../../lib/AxiosConfig';

function ProfileUpdatePage() {
  const { user, updateUser } = useAuthContext();
  const [serverMessage, setServerMessage] = useState({ type: "", content: "" });
  const [avatar, setavatar] = useState(user.avatar)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      password: ''
    }
  });
  const nav = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerMessage({ type: "", content: "" });
      if(avatar){
        data.avatar = avatar;
      } // Clear previous messages
      const response = await ApiRequest.put(`/users/${user.id}`, data);
      updateUser(response.data.user);
      setServerMessage({ type: "success", content: "Profile updated successfully!" });
      setTimeout(() => {
        nav("/profile");
      }, 150);
    } catch (error) {
      console.error("Error updating profile:", error);
      setServerMessage({ 
        type: "error", 
        content: error.response?.data?.message || "An error occurred while updating the profile." 
      });
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Update Profile</h1>
          {serverMessage.content && (
            <div className={`server-message ${serverMessage.type}`}>
              {serverMessage.content}
            </div>
          )}
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              {...register("username", { required: "Username is required" })}
              type="text"
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              type="email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              type="password"
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={avatar || '/noavatar.jpeg'} alt="User avatar" className="avatar" />
      <CloudinaryUploadWidget uwConfig={{
        cloudName: "dgvc5f1gr",
        uploadPreset: "Estate",
        multiple: false,
        maxImageFileSize:2000000,
        folder: 'avatars',
      
      }}
      setavatar={setavatar}
      />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;