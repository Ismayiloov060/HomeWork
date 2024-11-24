import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './DashBoard.css';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    console.log("Stored User Data: ", storedUserData); 
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
        <p>First Name: {userData.firstName}</p>
        <p>Last Name: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
}
