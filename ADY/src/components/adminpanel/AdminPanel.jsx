import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
import "./AdminPanel.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://localhost:7261/api/Users/GetUsers");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      toast.error("Error fetching users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id, email) => {
   
    if (email === "ady-admin@gmail.com") {
      toast.error("You cannot delete admin!");
      return;
    }

    if (!window.confirm("Are you want delete this user?")) return;

    try {
      const response = await fetch(
        `https://localhost:7261/api/Users/DeleteUser/${id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        toast.success("User deleted successfully!");
        setUsers(users.filter((user) => user.userId !== id));
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("Error deleting user.");
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="head">{t("admin")}</h1>
      <div className="users-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          users.map((user) => (
            <div key={user.userId} className="user-item">
              <p>
                {user.firstName} {user.lastName} ({user.email})
              </p>
              <button
                className="delete-button"
                onClick={() => handleDelete(user.userId, user.email)}
              >
                {t("delete")}
              </button>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick />
    </div>
  );
}
