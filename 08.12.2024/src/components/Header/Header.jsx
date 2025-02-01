import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import logo from "../../Logos/logo.png";
import user from "../../Logos/user.svg";

import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';



export default function Header() {
  
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
  };

  const closeLogin = () => {
    setLoginOpen(false);
  };

  const openRegister = () => {
    setRegisterOpen(true);
  };

  const closeRegister = () => {
    setRegisterOpen(false);
  };

  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={logo}  />
      </div>
      <div className="navbar-container">
        <Link to="/home">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/catalog">
          <button className="nav-button">Catalog</button>
        </Link>
        <Link to="/news">
          <button className="nav-button">News</button>
        </Link>
        <Link to="/about">
          <button className="nav-button">About Us</button>
        </Link>
        <div className="search">
    <div className="search-icon-wrapper">
      <SearchIcon />
    </div>
    <div className="styled-input-base">
      <InputBase placeholder="Search…" />
    </div>
  </div>
      </div>
      <div className="user-favorites-container">
        
        <div className="user-menu-container">
          <img src={user}  onClick={openLogin}/>
        </div>
      </div>

      {loginOpen && <Login onClose={closeLogin} openRegister={openRegister} />}

      {registerOpen && (
        <Register onClose={closeRegister} openLogin={openLogin} />
      )}
    </div>
  );
}