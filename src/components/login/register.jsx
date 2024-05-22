import React, { useState } from 'react';
import firebase, { db } from '../firebaseInit'; // Import Firebase and Firestore
import { useNavigate } from 'react-router-dom';
import './login.css';
import './util.css';
import logo from './images/img-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope, faUser, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Register() {
  const auth = firebase.auth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try { 
      const { email, password, username } = formData;
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      
      // User registered successfully
      console.log('User registered:', userCredential.user);

      // Save username to Firestore
      await db.collection("users").doc(userCredential.user.uid).set({
        username: username,
        email: email,
      });

      alert('User Registered Successfully!');
      navigate("/admin/controller");
    } catch (error) {
      console.error('Registration error:', error.message);
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
          <form className="login100-form validate-form" onSubmit={handleRegister}>
            <span className="login100-form-title">
              Admin Register
            </span>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input 
                className="input100" 
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                placeholder="Username" 
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <FontAwesomeIcon icon={faUser} />
              </span>
            </div>
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
                Register
              </button>
            </div>
            <div className="text-center p-t-136">
              <Link className="txt2" to="/login">
                Already Have An Account
                <FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
