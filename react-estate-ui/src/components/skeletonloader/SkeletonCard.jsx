import React from 'react';
import './SkeletonCard.scss';

function SkeletonCard() {
  return (
    <div className="card skeleton">
      <div className="imageContainer skeleton-box"></div>
      <div className="textContainer">
        <div className="title skeleton-box"></div>
        <div className="address skeleton-box"></div>
        <div className="price skeleton-box"></div>
        <div className="bottom">
          <div className="features">
            <div className="feature skeleton-box"></div>
            <div className="feature skeleton-box"></div>
          </div>
          <div className="icons">
            <div className="icon skeleton-box"></div>
            <div className="icon skeleton-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;