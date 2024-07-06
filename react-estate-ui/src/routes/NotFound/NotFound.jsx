import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="content">
        <div className="icon">
          <div className="circle"></div>
          <div className="exclamation"></div>
        </div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-button">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
