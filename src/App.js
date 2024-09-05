import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar/navbar';
import Login from './components/login/login';
import Register from './components/login/register';
import Home from './components/home/index';
import Sidebar from './components/Admin/Sidebar/sidebar';
import ProductPage from './components/productpage.jsx';
// Import your content components
import NewDeal from './components/Admin/NewDeal'; // Adjust path as needed
import AmazonLinks from './components/Admin/AmazonLinks';
import OtherLinks from './components/Admin/OrderReport.jsx';
import PaymentPortal from './components/Admin/PaymentPortal';
import EarningReport from './components/Admin/EarningReport';
import Register2 from './components/login/register2.jsx';
import Resetpassword from './components/login/resetpassword.jsx';
import About from './components/About/about.jsx';

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
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/product/:productId/:title" element={<ProductPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/:chatId?" element={<Login />} />
            <Route path="/register" element={<Register2 />} />
            <Route path='/resetpassword' element={<Resetpassword />} />
            <Route path="/admin/register" element={<Register />} />
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
      <About />
    </>
  );
}

export default App;
