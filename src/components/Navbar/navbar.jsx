import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faUser, faHeart, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'; // Import icons
import logo from '../Assets/logo.png'; // Assuming logo path is correct
import './navbar.css'; // Assuming CSS file exists
import 'firebase/auth';
import firebase from '../firebaseInit';
import { auth } from '../firebaseInit'; // Assuming firebaseConfig.js is set up correctly

const Navbar = () => {
  const [activeNavItem, setActiveNavItem] = useState(null);
  const searchBarRef = useRef(null);
  const navigation = useNavigate();

  // Firebase auth state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Navigation functions
  const handleSearchClick = () => {
    if (searchBarRef.current) {
      searchBarRef.current.focus();
    }
    setActiveNavItem('search');
  };

  const handleCategoriesClick = (px) => {
    window.scrollBy({
      top: px,
      behavior: 'smooth',
    });
    setActiveNavItem('categories');
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      navigation.push('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <>
      <div className="navbar" id="navbar1">
        <div className="navbar-brand" id="nav-logo">
          {logo && <img width={200} height={100} src={logo} alt="logo" />}
        </div>
        <div className="d-none d-sm-block col-md-6 form-group top_search">
          <form action="" method="post" className="form-inline">
            <div className="input-group">
              <input
                ref={searchBarRef}
                type="text"
                id="nav-search"
                className="form-control"
                placeholder="Search for..."
              />
              <span className="input-group-btn">
                <button className="btn btn-default search" type="submit">
                  Search
                </button>
              </span>
            </div>
          </form>
        </div>
        {user ? (
          <div className="d-block">
            <div className="nav-login-btn">
              <span>{user.displayName}</span> (assuming displayName exists)
              <button id="logoutbtn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          </div>
        ) : (
          <div className="d-block">
            <div className="nav-login-btn">
              <Link to="/login" id="loginbtn">
                <FontAwesomeIcon icon={faUser} /> Login or Register
              </Link>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <div className="mr-3 text-white">
                <a href="#" id="favouritesbtn">
                  <FontAwesomeIcon icon={faHeart} />
                </a>
              </div>
              <div className="ml-3 text-white">
                <a href="#" id="cartbtn">
                  <FontAwesomeIcon icon={faShoppingCart} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="navbar" id="navbar2">
        <div className="nav-dropdown dropdown">
          <span id="dropdown-trigger">
            Shop By Categories<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.41707 10L12.0029 13.5858L15.5887 10C15.9792 9.60952 16.6123 9.60952 17.0029 10C17.0517 10.0489 17.0944 10.1015 17.131 10.1569C17.3873 10.5451 17.3446 11.0726 17.0029 11.4143L12.71 15.7072C12.5224 15.8947 12.2681 16 12.0029 16C11.7376 16 11.4833 15.8947 11.2958 15.7072L7.00285 11.4143C6.61233 11.0237 6.61233 10.3906 7.00285 10C7.05167 9.95123 7.10428 9.90852 7.15973 9.87191C7.54788 9.61563 8.07536 9.65834 8.41707 10Z" fill="white" />
          </svg></span>
          <div className="dropdown-content">
            <a href="#">Appliances</a>
            <a href="#">Beauty and Personal Care</a>
            <a href="#">Mobile Phones and Accessories</a>
            <a href="#">Clothing, Footwear and Jewellery</a>
            <a href="#">Home and Kitchen</a>
            <a href="#">Toys and Games</a>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li className={`nav-item ${activeNavItem === null ? 'active' : ''}`}>
                      <NavLink to="/" className='nav-link'>Home</NavLink>
                    </li>
                    <li className={`nav-item ${activeNavItem === 'categories' ? 'active' : ''}`} onClick={() => handleCategoriesClick(400)}>
                      <p className='nav-link'>Categories</p>
                    </li>
                    <li className={`nav-item ${activeNavItem === 'about' ? 'active' : ''}`}>
                      <NavLink to="/about" className='nav-link' activeClassName="active">About</NavLink>
                    </li>
                    <li className={`nav-item ${activeNavItem === 'search' ? 'active' : ''}`} onClick={handleSearchClick}>
                      <p className='nav-link'>Search</p>
                    </li>
                    <li className={`nav-item ${activeNavItem === 'contact' ? 'active' : ''}`}>
                      <NavLink to="/contact" className='nav-link' activeClassName="activeNavLink">Contact</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
    </>
  )
}

export default Navbar;
