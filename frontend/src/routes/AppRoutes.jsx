import React from 'react'
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Project from '../pages/Project';
import  UserAuth from '../auth/userAuth';

const AppRoutes = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={ <UserAuth><Home /></UserAuth> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/project" element={ <UserAuth><Project /></UserAuth> } />


    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes