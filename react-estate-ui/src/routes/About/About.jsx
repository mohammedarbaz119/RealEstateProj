import React from 'react';
import './About.scss';

function AboutPage() {
  return (
    <div className="aboutPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">About Dreamestate</h1>
          <p>
            At Dreamestate, we believe everyone deserves to find their perfect home. Founded in 2022, 
            we've quickly become the go-to platform for those seeking their dream property. Our mission 
            is to simplify the often complex process of buying, selling, and renting real estate.
          </p>
          <p>
            With a team of dedicated professionals and cutting-edge technology, we offer a seamless, 
            user-friendly experience that connects buyers with sellers and tenants with landlords. 
            We're not just a listing site; we're a community of real estate enthusiasts committed to 
            helping you find the place where your next chapter begins.
          </p>
          <div className="features">
            <div className="feature">
              <h3>Expert Team</h3>
              <p>Our professionals are here to guide you every step of the way.</p>
            </div>
            <div className="feature">
              <h3>Wide Range</h3>
              <p>From studios to mansions, we have something for everyone.</p>
            </div>
            <div className="feature">
              <h3>User-Friendly</h3>
              <p>Our platform is designed with you in mind, making your search a breeze.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;