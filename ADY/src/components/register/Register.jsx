import React, { useState } from "react";
import x from "../../assets/x.svg";
import "./Register.css";

export default function Register({ onClose, openLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setMessage("Пароли не совпадают");
      return;
    }

    const userDTO = {
      Email: email,
      Password: password,
      FirstName: "", // Добавь если нужно
      LastName: "",  // Добавь если нужно
    };

    try {
      const response = await fetch("http://localhost:5000/api/Users/Registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDTO),
      });

      if (response.ok) {
        setMessage("Пользователь успешно зарегистрирован");
        // Очистка полей после успешной регистрации
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Ошибка при регистрации");
      }
    } catch (error) {
      setMessage("Ошибка при отправке данных на сервер");
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
            name="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="Password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="ConfirmPassword"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {message && <p>{message}</p>}
          <button className="register-button" onClick={handleRegister}>
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
