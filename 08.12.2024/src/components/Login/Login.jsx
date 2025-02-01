
import React from "react";
import x from "../../Logos/x.svg";
import "../Login/Login.css";

export default function Login({ onClose, openRegister }) {
  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-modal" onClick={onClose}>
          <img src={x} alt="close-btn" />
        </button>
        <div className="modal-right-left-container">
          <h1>Вход</h1>
          <input type="email" name="Email" placeholder="Email" />
          <input type="password" name="Password" placeholder="Password" />
          <button className="log-in-button">Войти</button>
          <div className="to-registration-section">
    
            <button
              href="#toRegister"
              className="to-registration-button"
              onClick={() => {
                onClose();
                openRegister();
              }}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
