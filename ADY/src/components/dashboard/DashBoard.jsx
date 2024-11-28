import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './DashBoard.css';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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
        <h1 className="dash">{t("dashboard")}</h1>
        <p>{t("first name")}: {userData.firstName}</p>
        <p>{t("last name")}: {userData.lastName}</p>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
}
