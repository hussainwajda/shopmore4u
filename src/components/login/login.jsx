import React, { useState, useEffect } from 'react';
import firebase from '../firebaseInit';   
import { useNavigate, useParams } from 'react-router-dom';
import './login.css';
import './util.css';
import logo from './images/img-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import AdsenseComponent from '../adSense';

function Login() {
  const auth = firebase.auth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { chatId } = useParams(); // Get chatId from URL if it exists

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User logged in successfully');

      if (chatId) {
        // This is a Telegram login
        const idToken = await user.getIdToken(true);
        
        // Store the chatId in Firestore
        await firebase.firestore().collection('users').doc(user.uid).set({
          telegramChatId: chatId
        }, { merge: true });

        // Notify the server about successful Telegram login
        await fetch('https://server.shopmore4u.com/telegram-login-success', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId, idToken })
        });
        alert('LOGIN SUCCESSFUL!!!!, Go back To Bot for Generating Links');
        // Close the window and redirect back to Telegram
        window.close();
      } else {
        // Regular login, redirect to admin controller
        navigate("/admin/controller");
      }
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  return (
  <>  
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={logo} alt="IMG" />
          </div>
          <form className="login100-form validate-form" onSubmit={handleLogin}>
            <span className="login100-form-title">
              {chatId ? 'Telegram Login' : 'Admin Login'}
            </span>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input 
                className="input100" 
                type="text" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input 
                className="input100" 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Password" 
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FontAwesomeIcon icon={faLock} />
              </span>
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">
                Login
              </button>
            </div>
            {!chatId && (
              <>
                <div className="text-center p-t-12">
                  <span className="txt1">
                    Forgot
                  </span>
                  <Link className="txt2" to="/resetpassword">
                    Username / Password?
                  </Link>
                </div>
                <div className="text-center p-t-136">
                  <Link className="txt2" to="/register">
                    Create your Account
                    <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                  </Link>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
    <AdsenseComponent />
  </>  
  );
}

export default Login;