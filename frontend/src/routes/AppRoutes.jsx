import React from 'react'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Project from '../pages/Project';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/project" element={ <Project /> } />


    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes