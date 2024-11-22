import React, { useState } from "react";
import x from "../../assets/x.svg";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onClose, openRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Please enter your email";
    if (!formData.password) newErrors.password = "Please enter your password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
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
          const user = await response.json();
        
          localStorage.setItem("user", JSON.stringify(user));

          
          const userDataResponse = await fetch(`https://localhost:7261/api/Users/GetUserData?email=${formData.email}`);
          if (userDataResponse.ok) {
            const userData = await userDataResponse.json();
            localStorage.setItem("userData", JSON.stringify(userData)); 
          }

          alert("Login successful");
          navigate("/dashboard"); 
        } else if (response.status === 204) {
          setLoginError("Incorrect email or password");
        } else {
          setLoginError("Server error, please try again later.");
        }
      } catch (error) {
        setIsLoading(false);
        setLoginError("Connection error");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="close-modal" onClick={onClose}>
          <img src={x} alt="close-btn" />
        </button>
        <div className="modal-right-left-container">
          <h1>Login</h1>
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
          {loginError && <span className="error">{loginError}</span>}
          <button className="log-in-button" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Loading..." : "Log In"}
          </button>
          <button
            className="to-registration-button"
            onClick={() => {
              onClose();
              openRegister();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
