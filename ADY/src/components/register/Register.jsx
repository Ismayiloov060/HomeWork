import React, { useState } from "react";
import x from "../../assets/x.svg";
import "./Register.css";

export default function Register({ onClose, openLogin }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Пожалуйста, введите имя";
    if (!formData.lastName) newErrors.lastName = "Пожалуйста, введите фамилию";
    if (!formData.email) newErrors.email = "Пожалуйста, введите email";
    if (!formData.password) newErrors.password = "Пожалуйста, введите пароль";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Пожалуйста, подтвердите пароль";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Пароли не совпадают";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch("https://localhost:7261/api/Users/Registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        setIsLoading(false);

        if (response.ok) {
          alert("Регистрация успешна");
          onClose();
          openLogin();
        } else {
          const errorData = await response.json();
          setRegisterError(errorData.message || "Ошибка регистрации. Попробуйте позже.");
        }
      } catch (error) {
        setIsLoading(false);
        setRegisterError("Ошибка при соединении с сервером");
      }
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
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="Имя"
            onChange={handleInputChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Фамилия"
            onChange={handleInputChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

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
            placeholder="Пароль"
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Подтвердите пароль"
            onChange={handleInputChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          {registerError && <span className="error">{registerError}</span>}

          <button className="register-button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Загрузка..." : "Зарегистрироваться"}
          </button>

          <button
            className="to-login-button"
            onClick={() => {
              onClose();
              openLogin();
            }}
          >
            Уже есть аккаунт? Войти
          </button>
        </div>
      </div>
    </div>
  );
}
