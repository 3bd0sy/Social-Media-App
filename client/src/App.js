import './App.css';
import React, { useState } from 'react';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Auth from './Pages/Auth/Auth';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.authReducer.authData)
  return (
    <div className="App">
      <div className='blur' style={{ top: "-20%", right: "0" }}></div>
      <div className='blur' style={{ top: "38%", left: "-8rem" }}></div>

      <Routes>
        <Route path='/' element={user ? <Navigate to="home" /> : <Navigate to="auth" />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to="../auth" />} />
        <Route path='/auth' element={user ? <Navigate to="../home" /> : <Auth />} />
        <Route path='/profile/:id' element={user ? <Profile to="../home" /> : <Navigate to="../auth" />} />
      </Routes>
    </div>
  );
}

export default App;
