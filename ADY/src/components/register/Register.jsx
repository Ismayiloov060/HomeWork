import React, { useState } from "react";
import x from "../../assets/x.svg";
import "./Register.css";

export default function Register({ onClose, openLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Пожалуйста, введите email";
    if (!formData.password) newErrors.password = "Пожалуйста, введите пароль";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Пожалуйста, подтвердите пароль";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
      console.log("Форма отправлена");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-modal" onClick={onClose}>
          <img src={x} alt="close-btn" />
        </button>
        <div className="modal-window-container">
          <h1>Регистрация</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm Password"
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
          <button className="register-button" onClick={handleSubmit}>
            Регистрация
          </button>
          <button
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
  );
}