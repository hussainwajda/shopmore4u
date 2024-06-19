import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Login from './components/login/login';
import Register from './components/login/register';
import Home from './components/home/index';
import Sidebar from './components/Admin/Sidebar/sidebar';

// Import your content components
import NewDeal from './components/Admin/NewDeal'; // Adjust path as needed
import AmazonLinks from './components/Admin/AmazonLinks';
import OtherLinks from './components/Admin/OtherLinks.jsx';
import PaymentPortal from './components/Admin/PaymentPortal';
import EarningReport from './components/Admin/EarningReport';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/controller" element={<AdminLayout />}> 
            <Route path="new-deal" element={<NewDeal />} />
            <Route path="amazon-links" element={<AmazonLinks />} />
            <Route path="other-links" element={<OtherLinks />} />
            <Route path="payment-portal" element={<PaymentPortal />} />
            <Route path="earning-report" element={<EarningReport />} />
          </Route>
          <Route element={<Layout />}>  {/* Layout for other routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Layout for admin section with Sidebar
function AdminLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />  
    </>
  );
}

// Layout for other routes with Navbar
function Layout() { 
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
