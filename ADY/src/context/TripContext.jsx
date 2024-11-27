import React, { createContext, useContext, useState, useEffect } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: [], 
  });

  const [bookedSeats, setBookedSeats] = useState([]); 

  useEffect(() => {
    
    const savedTrip = JSON.parse(localStorage.getItem("trip")) || {};
    const savedBookedSeats = JSON.parse(localStorage.getItem("bookedSeats")) || [];

    setTrip(savedTrip);
    setBookedSeats(savedBookedSeats);
  }, []);

  useEffect(() => {

    localStorage.setItem("trip", JSON.stringify(trip));
    localStorage.setItem("bookedSeats", JSON.stringify(bookedSeats));
  }, [trip, bookedSeats]);

  
  const updateTrip = (field, value) => {
    setTrip((prev) => ({ ...prev, [field]: value }));
  };

  
  const addSeat = (seatNumber) => {
    setTrip((prev) => ({
      ...prev,
      seats: [...prev.seats, seatNumber],
    }));
  };
  
  const removeSeat = (seatNumber) => {
    setTrip((prev) => ({
      ...prev,
      seats: prev.seats.filter((seat) => seat !== seatNumber),
    }));
  };

  
  const bookSeats = (seats) => {
    setBookedSeats((prevBookedSeats) => {
      const updatedBookedSeats = [...new Set([...prevBookedSeats, ...seats])];
      return updatedBookedSeats;
    });
  };

  
  const unbookSeats = (seats) => {
    setBookedSeats((prevBookedSeats) => {
      const updatedBookedSeats = prevBookedSeats.filter((seat) => !seats.includes(seat));
      return updatedBookedSeats;
    });
  };

  
  const seatPrice = 15;
  const totalPrice = trip.seats.length * seatPrice;

  return (
    <TripContext.Provider
      value={{
        trip,
        updateTrip,
        addSeat,
        removeSeat,
        bookedSeats,
        bookSeats,
        unbookSeats,
        totalPrice,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
