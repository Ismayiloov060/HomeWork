import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './DashBoard.css';  

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      navigate("/login"); 
    } else {
      setUserData(JSON.parse(storedUserData));
    }
  }, [navigate]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Personal Dashboard</h1>
        <p>First Name: {userData.FirstName}</p>
        <p>Last Name: {userData.LastName}</p>
        <p>Email: {userData.Email}</p>
      </div>
    </div>
  );
}
