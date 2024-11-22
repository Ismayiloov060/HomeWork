import React, { useEffect, useState } from "react";

const TicketPage = ({ userId }) => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`/api/tickets/GetTickets/${userId}`);
                if (!response.ok) {
                    console.error("Failed to fetch tickets");
                    return;
                }
                const data = await response.json();
                setTickets(data);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };

        fetchTickets();
    }, [userId]);

    return (
        <div className="space-y-5">
            <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">My Tickets</h2>

            {tickets.length === 0 ? (
                <p>No tickets found</p>
            ) : (
                tickets.map(ticket => (
                    <div key={ticket.TicketId} className="p-4 border rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold">Ticket from {ticket.From} to {ticket.To}</h3>
                        <p>Date: {ticket.Date}</p>
                        <p>Time: {ticket.Time}</p>
                        <p>Seats: {ticket.Seats}</p>
                        <p>Total Price: ${ticket.TotalPrice}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default TicketPage;
