import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Login from './components/login/login';
import Register from './components/login/register';
import Home from './components/home/index';
import Sidebar from './components/Admin/Sidebar/sidebar';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/controller" element={<Sidebar />} />
          <Route element={<Layout />}> {/* Use a Layout component */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() { // New Layout component
  return (
    <>
      <Navbar />
      <Outlet />  {/* This renders the nested route's content */}
    </>
  );
}

export default App;
