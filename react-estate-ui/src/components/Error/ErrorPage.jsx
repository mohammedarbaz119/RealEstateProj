import React from 'react';
import { Link } from 'react-router-dom';
import "./error.scss";

const ErrorPage = ({ errorCode = '500', errorMessage = 'Internal Server Error' }) => {
  return (
    <div className="error-page">
      <div className="content">
        <div className="icon">
          <div className="triangle"></div>
          <div className="exclamation"></div>
        </div>
        <h1>{errorCode}</h1>
        <h2>{errorMessage}</h2>
        <p>We&apos;re sorry, something went wrong on our end. Please try again later.</p>
        <Link to="/" className="home-button">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;