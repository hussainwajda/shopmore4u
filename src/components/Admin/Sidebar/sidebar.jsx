import React, { useState, useEffect } from 'react';
import './sidebar.css';
import logo from '../../Assets/logo.png'; // Update the path to your logo image
import { Link } from 'react-router-dom';
import NewDeal from '../NewDeal';
import AmazonLinks from '../AmazonLinks';

const Sidebar = () => {
  const [startAnimate, setStartAnimate] = useState(false);
  const [highlightTopPosition, setHighlightTopPosition] = useState(150); // Adjust initial position considering the logo height
  const [currCount, setCurrCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // State to manage the active tab content

  const onClickTab = (count) => {
    setStartAnimate(false);
    setCurrCount(count);
    setHighlightTopPosition(150 + count * 52); // Adjust the highlight position considering the logo height
    setActiveTab(count); // Set the active tab

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

  // Content for each tab
  const renderContent = () => {
    switch(activeTab) {
      case 0:
        return <NewDeal />;
      case 1:
        return <AmazonLinks />;
      case 2:
        return <div>Content for Other Links</div>;
      case 3:
        return <div>Content for Payment Portal</div>;
      case 4:
        return <div>Content for Earning Report</div>;
      default:
        return null;
    }
  }

  return (
    <div className="sidebar-container">
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

        <Link className={currCount === 0 ? 'active' : ''} to="#" onClick={() => onClickTab(0)}>
          <span className={currCount === 0 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>New Deal</span>
        </Link>
        <a className={currCount === 1 ? 'active' : ''} href="#" onClick={() => onClickTab(1)}>
          <span className={currCount === 1 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Amazon Links</span>
        </a>
        <a className={currCount === 2 ? 'active' : ''} href="#" onClick={() => onClickTab(2)}>
          <span className={currCount === 2 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Other Links</span>
        </a>
        <a className={currCount === 3 ? 'active' : ''} href="#" onClick={() => onClickTab(3)}>
          <span className={currCount === 3 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Payment Portal</span>
        </a>
        <a className={currCount === 4 ? 'active' : ''} href="#" onClick={() => onClickTab(4)}>
          <span className={currCount === 4 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Earning Report</span>
        </a>
        <Link className={currCount === 5 ? 'active' : ''} to="/" onClick={() => onClickTab(5)}>
          <span className={currCount === 5 ? 'text-active' : ''}><i className="fas fa-arrow-right"></i>Back To Home</span>
        </Link>
      </div>
      <div className={`content-container ${isOpen ? 'sidebar-open' : ''}`}>
        {renderContent()}
      </div>
    </div>
  )
}

export default Sidebar;
