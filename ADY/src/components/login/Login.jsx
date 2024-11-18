import React, { useState } from "react";
import x from "../../assets/x.svg";
import "./Login.css";

export default function Login({ onClose, openRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginDTO = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/Users/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDTO),
      });

      if (response.ok) {
        const userData = await response.json();
        setMessage("Успешный вход");
        // Здесь можешь сохранять данные пользователя в state или в localStorage
        console.log(userData); // для проверки данных
      } else {
        setMessage("Неверный логин или пароль");
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
        <div className="modal-right-left-container">
          <h1>Вход</h1>
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
          {message && <p>{message}</p>}
          <button className="log-in-button" onClick={handleLogin}>
            Войти
          </button>
          <button
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
  );
}
