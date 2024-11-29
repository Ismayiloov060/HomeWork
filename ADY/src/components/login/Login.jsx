import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { useTranslation } from 'react-i18next';

export default function Login({ onClose, openRegister, onLoginSuccess }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Please enter your email";
      toast.error("Please enter your email");
    }
    if (!formData.password) {
      newErrors.password = "Please enter your password";
      toast.error("Please enter your password");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch("https://localhost:7261/api/Users/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        setIsLoading(false);

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem('userData', JSON.stringify(userData));

          toast.success("Login successful!");

          
          const role = userData.email === "ady-admin@gmail.com" ? "admin" : "user";
          onLoginSuccess(role);  

        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Login error. Please try again later.");
        }
      } catch (error) {
        setIsLoading(false);
        toast.error("Invalid Account");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="modal-window-container">
          <h1 className="head2">{t("login")}</h1>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder={t("password")}
            onChange={handleInputChange}
          />

          <button className="to-register-button" onClick={handleSubmit} disabled={isLoading}>
            {t("log")}
          </button>

          <button
            className="to-register-button"
            onClick={() => {
              onClose();
              openRegister();
            }}
          >
            {t("don't have")}
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick />
    </div>
  );
}