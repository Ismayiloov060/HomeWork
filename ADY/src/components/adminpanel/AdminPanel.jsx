import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
import "./AdminPanel.css";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingTickets, setIsLoadingTickets] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    fetchUsers();
    fetchTickets();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
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
      setIsLoadingUsers(false);
    }
  };

  const fetchTickets = async () => {
    setIsLoadingTickets(true);
    try {
      const response = await fetch("https://localhost:7261/api/Tickets/All");
      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      } else {
        toast.error("Failed to fetch tickets.");
      }
    } catch (error) {
      toast.error("Error fetching tickets.");
    } finally {
      setIsLoadingTickets(false);
    }
  };

  const handleDeleteUser = async (id, email) => {
    if (email === "ady-admin@gmail.com") {
      toast.error("You cannot delete admin!");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

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

  const handleDeleteTicket = async (ticketId) => {
    if (!window.confirm("Are you sure you want to delete this ticket?")) return;

    try {
      const response = await fetch(
        `https://localhost:7261/api/Tickets/Delete/${ticketId}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        toast.success("Ticket deleted successfully!");
        setTickets(tickets.filter((ticket) => ticket.ticketId !== ticketId));
      } else {
        toast.error("Failed to delete ticket.");
      }
    } catch (error) {
      toast.error("Error deleting ticket.");
    }
  };

  return (
    <div className="admin-panel">
      <h1 className="head">{t("admin")}</h1>
      <div className="columns-container">
       
        <div className="users-list">
          <h2 className="head5">{t("users")}</h2>
          {isLoadingUsers ? (
            <p>Loading users...</p>
          ) : (
            users.map((user) => (
              <div key={user.userId} className="user-item">
                <p>
                  {user.firstName} {user.lastName} ({user.email})
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.userId, user.email)}
                >
                  {t("delete")}
                </button>
              </div>
            ))
          )}
        </div>

        <div className="tickets-list">
          <h2 className="head5">{t("tickets")}</h2>
          {isLoadingTickets ? (
            <p>Loading tickets...</p>
          ) : (
            tickets.map((ticket) => (
              <div key={ticket.ticketId} className="ticket-item">
                <p>
                  {ticket.fullName} ({ticket.email}) - {ticket.from} to {ticket.to} 
                  <br />
                  {ticket.date} at {ticket.time} - {ticket.seats} seats
                </p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTicket(ticket.ticketId)}
                >
                  {t("delete")}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick />
    </div>
  );
}
