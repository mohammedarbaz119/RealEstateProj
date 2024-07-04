import React from 'react';
import './contact.scss';

function ContactPage() {
  return (
    <div className="contactPage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Contact Us</h1>
          <p>
            Have questions or need assistance? We're here to help! Reach out to us using the form below 
            or through our contact information.
          </p>
          <form className="contactForm">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
          <div className="contactInfo">
            <div className="infoItem">
              <h3>Address</h3>
              <p>123 Dreamestate Street, Real City, 12345</p>
            </div>
            <div className="infoItem">
              <h3>Phone</h3>
              <p>+1 (123) 456-7890</p>
            </div>
            <div className="infoItem">
              <h3>Email</h3>
              <p>info@dreamestate.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;