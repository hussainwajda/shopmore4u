import React, { useState, useEffect } from 'react';
import './sidebar.css';
import logo from '../../Assets/logo.png'; // Update the path to your logo image

const Sidebar = () => {
  const [startAnimate, setStartAnimate] = useState(false);
  const [highlightTopPosition, setHighlightTopPosition] = useState(150); // Adjust initial position considering the logo height
  const [currCount, setCurrCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const onClickTab = (count) => {
    setStartAnimate(false);
    setCurrCount(count);
    setHighlightTopPosition(150 + count * 52); // Adjust the highlight position considering the logo height

    setTimeout(() => {
      setStartAnimate(true);
    }, 100);
  }

  useEffect(() => {
    setTimeout(() => {
      setStartAnimate(true);
    }, 500);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div 
          style={{ top: `${highlightTopPosition}px` }} 
          className={`sidebar__highlight ${startAnimate ? 'sidebar__highlight__animate' : ''}`}>
        </div>

        <a className={currCount === 0 ? 'active' : ''} href="#home" onClick={() => onClickTab(0)}>
          <span className={currCount === 0 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>New Deal</span>
        </a>
        <a className={currCount === 1 ? 'active' : ''} href="#news" onClick={() => onClickTab(1)}>
          <span className={currCount === 1 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Amazon Links</span>
        </a>
        <a className={currCount === 2 ? 'active' : ''} href="#contact" onClick={() => onClickTab(2)}>
          <span className={currCount === 2 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Other Links</span>
        </a>
        <a className={currCount === 3 ? 'active' : ''} href="#about" onClick={() => onClickTab(3)}>
          <span className={currCount === 3 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Payment Portal</span>
        </a>
        <a className={currCount === 3 ? 'active' : ''} href="#about" onClick={() => onClickTab(4)}>
          <span className={currCount === 3 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Earning Report</span>
        </a>
      </div>
    </div>
  )
}

export default Sidebar;
