import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(
        `https://localhost:7261/api/Users/DeleteUser/${id}`,
        {
          method: "DELETE",
        }
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
      <h1>Admin Panel</h1>
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
                onClick={() => handleDelete(user.userId)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick />
    </div>
  );
}