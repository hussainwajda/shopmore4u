import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import './login.css'; 

const ContactAdmin = () => {
    const handleWhatsAppClick = () => {
        window.open("https://wa.me/+919854115555", "_blank", "noopener noreferrer");
      };
  return (
    <div className="contact-admin-container">
      <div className="contact-admin-wrapper">
        <h1>Please contact the admin by clicking the button below</h1>

        <button onClick={handleWhatsAppClick} className="whatsapp-button">
          Continue To WhatsApp 
        </button>

        <div className="login-link">
          <Link to="/login">
            Already Have An Account?
            <FontAwesomeIcon icon={faLongArrowAltLeft} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactAdmin;
