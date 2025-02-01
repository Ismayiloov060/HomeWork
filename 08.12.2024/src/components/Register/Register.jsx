
import React from "react";
import x from "../../Logos/x.svg";
import "../Register/Register.css";

export default function Register({ onClose, openLogin }) {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-modal" onClick={onClose}>
          <img src={x} alt="close-btn" />
        </button>
        <div className="modal-window-container">
          <h1>Регистрация</h1>
          <input type="email" name="Email" placeholder="Email" />
          <input type="password" name="Password" placeholder="Password" />
          <input type="password" name="Password" placeholder="Confirm Password" />
          <button className="register-button">Регистрация</button>
          <div className="to-login-section">
      
            <button
              href="#toLogin"
              className="to-login-button"
              onClick={() => {
                onClose();
                openLogin();
              }}
            >
              Вход
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
