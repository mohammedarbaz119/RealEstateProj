import React, { useEffect, useState } from 'react';
import { useForm,Controller } from 'react-hook-form';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import CloudinaryUploadWidget from "../../components/uploadWidget/CloudinaryUploadWidget";
import "./newPostPage.scss";
import ApiRequest from '../../lib/AxiosConfig';

function NewPostPage() {
  const { register, handleSubmit,control, formState: { errors } } = useForm();
  const [serverMessage, setServerMessage] = useState({ type: "", content: "" });
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };
  useEffect(() => {
    // console.log(images);
  }, [images]);
  const onSubmit = async (data) => {
    try {
      setServerMessage({ type: "", content: "" });
      const postData = {
        postData: {
          title: data.title,
          price: parseInt(data.price),
          images: images,
          address: data.address,
          city: data.city,
          bedrooms: parseInt(data.bedrooms),
          bathrooms: parseInt(data.bathrooms),
          latitude: data.latitude,
          longitude: data.longitude,
          type: data.type,
          property: data.property,
        },
        postDetail: {
          desc: data.desc,
          utilities: data.utilities,
          pet: data.pet,
          income: data.income,
          size: data.size ? parseInt(data.size) : null,
          school: data.school ? parseInt(data.school) : null,
          bus: data.bus ? parseInt(data.bus) : null,
          restaurant: data.restaurant ? parseInt(data.restaurant) : null,
        }
      };
      console.log(postData);

      const response = await ApiRequest.post('/posts', postData);
      setServerMessage({ type: "success", content: "Post created successfully!" });
      setTimeout(() => {
        navigate("/profile");
      }, 500);
    } catch (error) {
      console.error("Error creating post:", error);
      setServerMessage({
        type: "error",
        content: error.response?.data?.message || "An error occurred while creating the post."
      });
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
         
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" {...register("title", { required: "Title is required" })} type="text" />
              {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" {...register("price", { required: "Price is required", min: 0 })} type="number" />
              {errors.price && <span style={{ color: 'red' }}>{errors.price.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" {...register("address", { required: "Address is required" })} type="text" />
              {errors.address && <span style={{ color: 'red' }}>{errors.address.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" {...register("city", { required: "City is required" })} type="text" />
              {errors.city && <span style={{ color: 'red' }}>{errors.city.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="bedrooms">Bedroom Number</label>
              <input id="bedrooms" {...register("bedrooms", { required: "Bedroom number is required", min: 1 })} type="number" />
              {errors.bedrooms && <span style={{ color: 'red' }}>{errors.bedrooms.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="bathrooms">Bathroom Number</label>
              <input id="bathrooms" {...register("bathrooms", { required: "Bathroom number is required", min: 1 })} type="number" />
              {errors.bathrooms && <span style={{ color: 'red' }}>{errors.bathrooms.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" {...register("latitude", { required: "Latitude is required" })} type="text" />
              {errors.latitude && <span style={{ color: 'red' }}>{errors.latitude.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" {...register("longitude", { required: "Longitude is required" })} type="text" />
              {errors.longitude && <span style={{ color: 'red' }}>{errors.longitude.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select {...register("type", { required: "Type is required" })}>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
              {errors.type && <span style={{ color: 'red' }}>{errors.type.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select {...register("property", { required: "Property type is required" })}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
              {errors.property && <span style={{ color: 'red' }}>{errors.property.message}</span>}
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <Controller
                name="desc"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <ReactQuill 
                    theme="snow"
                    {...field}
                    style={{ height: '200px', marginBottom: '50px' }}
                  />
                )}
              />
              {errors.desc && <span style={{ color: 'red' }}>{errors.desc.message}</span>}
              </div>
            <div className="item">
              <label htmlFor="property">Utilities Policy</label>
              <select {...register("utilities")}>
                <option value="owner">owner is responsible</option>
                <option value="tenant">tenant is responsible</option>
                <option value="shared">shared</option>
              </select>
            </div>
            <div className="item">
             <label htmlFor="pet">Pet Policy</label>
              <select {...register("pet")}>
                <option value="allowed">Pets are allowed</option>
                <option value="notallowed">Pets are not allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input id="income" {...register("income")} type="text" />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input id="size" {...register("size")} type="number" min={0} />
              {errors.size && <span style={{ color: 'red' }}>{errors.size.message}</span>} 
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input id="school" {...register("school")} type="number" min={0}/>
              {errors.school && <span style={{ color: 'red' }}>{errors.school.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input id="bus" {...register("bus")} type="number" min={0}/>
              {errors.bus && <span style={{ color: 'red' }}>{errors.bus.message}</span>}
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input id="restaurant" {...register("restaurant")} type="number" min={0} />
              {errors.restaurant && <span style={{ color: 'red' }}>{errors.restaurant.message}</span>}     
            </div>
            <button type="submit" className="sendButton">Add</button>
          </form>
          {serverMessage.content && (
            <div className={`server-message ${serverMessage.type}`}>
              {serverMessage.content}
            </div>
          )}
        </div>
      </div>
      <div className="sideContainer">
        <h2>Upload Images</h2>
        <CloudinaryUploadWidget
          uwConfig={{
            cloudName: "dgvc5f1gr",
            uploadPreset: "Estate",
            multiple: true,
            maxImageFileSize: 2000000,
            folder: 'postimages',
          }}
          setImages={setImages}
          buttonProps={{ type: 'button' }}
        />
        <div style={{
          marginTop: '20px',
          maxHeight: '600px',
          overflowY: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {images.map((image, index) => (
            <div key={index} style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.9rem' }}>Image {index + 1}</span>
                <button
                  onClick={() => removeImage(index)}
                  style={{
                    background: '#ff4d4d',
                    color: 'white',
                    border: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;