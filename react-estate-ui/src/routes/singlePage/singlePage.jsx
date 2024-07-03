import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import DOMPurify from 'dompurify';
import Map from "../../components/map/Map";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";

function SinglePage() {
  const data = useLoaderData();
  const {post,isSaved}=  data
  const nav = useNavigate();
  const {user} = useAuthContext();
  const [saved,Setsaved] = useState(isSaved)
  const handlesave = async () => {
    try {
      if(!user){
        nav("/login");
      }
      Setsaved(prev=>!prev)
      const reps =await axios.post(`/api/users/save`,
      {postId:post.id});
    } catch (error) {
      Setsaved(prev=>!prev)
      console.error("Error saving post:", error);
  }};

  function roundToDecimalPlace(num, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
  }
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.User.avatar || "/noavatar.jpeg"} alt="" />
                <span>{post.User.username}</span>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.postDetail.desc)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                <p>{post.postDetail.utilities}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post.postDetail.pet}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedrooms} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathrooms} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school>999? roundToDecimalPlace(post.postDetail.school/1000,1) + " km":post.postDetail.school+"m"} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus>999? roundToDecimalPlace(post.postDetail.bus/1000,1) + " km":post.postDetail.bus+"m"} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant>999? roundToDecimalPlace(post.postDetail.restaurant/1000,1) + " km":post.postDetail.restaurant+"m"} away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handlesave} style={{backgroundColor:saved?"#fece51":"white"}}>
              <img src="/save.png" alt="" />
              {saved?"Place saved": "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
