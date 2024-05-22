import React, { useState } from 'react';
import firebase from '../firebaseInit';   
import { useNavigate } from 'react-router-dom';
import './login.css';
import './util.css';
import logo from './images/img-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Login() {
  const auth = firebase.auth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

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
      await auth.signInWithEmailAndPassword(email, password);
      console.log('User logged in successfully');
      // Redirect to desired page after successful login
      navigate("/admin/controller"); // Example: Redirect to dashboard
    } catch (error) {
      console.error('Login error:', error.message);
      alert(error.message);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={logo} alt="IMG" />
          </div>
          <form className="login100-form validate-form" onSubmit={handleLogin}>
            <span className="login100-form-title">
              Admin Login
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
            <div className="text-center p-t-12">
              <span className="txt1">
                Forgot
              </span>
              <a className="txt2" href="#">
                Username / Password?
              </a>
            </div>
            <div className="text-center p-t-136">
              <Link className="txt2" to="/register">
                Create your Account
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
