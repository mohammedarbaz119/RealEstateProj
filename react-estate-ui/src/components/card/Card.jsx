// import { Link } from "react-router-dom";
// import "./card.scss";
// import { useEffect } from "react";
// import { useAuthContext } from "../../context/AuthContext";

// function Card({ item }) {
//   const { user, updateUser } = useAuthContext();
    
//   return (
//     <div className="card">
//       <Link to={`/listing/${item.id}`} className="imageContainer">
//         <img src={item.images[0]} alt="" />
//       </Link>
//       <div className="textContainer">
//         <h2 className="title">
//           <Link to={`/${item.id}`}>{item.title}</Link>
//         </h2>
//         <p className="address">
//           <img src="/pin.png" alt="" />
//           <span>{item.address}</span>
//         </p>
//         <p className="price">$ {item.price}</p>
//         <div className="bottom">
//           <div className="features">
//             <div className="feature">
//               <img src="/bed.png" alt="" />
//               <span>{item.bedrooms} bedroom</span>
//             </div>
//             <div className="feature">
//               <img src="/bath.png" alt="" />
//               <span>{item.bathrooms} bathroom</span>
//             </div>
//           </div>
//           <div className="icons">
//             <div className="icon">
//               <img src="/save.png" alt="" />
//             </div>
//             <div className="icon">
//               <img src="/chat.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../../context/AuthContext';
import './card.scss';

function Card({ item }) {
  const [isSaved, setIsSaved] = useState(item.isSaved);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    function getdata() {
      axios.get('/api/posts/'+item.id,{withCredentials:true}).then((res) => {
        setIsSaved(res.data.isSaved);
      });
    }
    getdata();
  },[]);
  const handleSave = async () => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      setIsSaved(prev=>!prev);
      const response = await axios.post('/api/users/save', { postId: item.id });
    console.log(response);
    } catch (error) {
      setIsSaved(prev=>!prev);
      console.error('Error saving item:', error);
    }
  };

  const handleChat = () => {
    if (!user) {
      navigate('/login');
    } else {
      // Implement chat functionality here
      console.log('Chat functionality not implemented');
    }
  };

  return (
    <div className="card">
      <Link to={`/listing/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedrooms} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathrooms} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon" onClick={handleSave} >
              <img src={"/save.png"} alt="" style={{backgroundColor:isSaved?"orange":"white"}}/>
            </div>
            <div className="icon" onClick={handleChat}>
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;