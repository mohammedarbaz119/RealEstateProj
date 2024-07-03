import React from 'react';
import './SkeletonChat.scss';

function SkeletonChat() {
  return (
    <div className="card-skeleton">
      <div className="imageContainer-skeleton"></div>
      <div className="textContainer-skeleton">
        <div className="title-skeleton"></div>
        <div className="address-skeleton"></div>
        <div className="price-skeleton"></div>
        <div className="bottom-skeleton">
          <div className="features-skeleton">
            <div className="feature-skeleton"></div>
            <div className="feature-skeleton"></div>
          </div>
          <div className="icons-skeleton">
            <div className="icon-skeleton"></div>
            <div className="icon-skeleton"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonChat;