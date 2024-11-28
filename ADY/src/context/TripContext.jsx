import React, { createContext, useState, useContext, useEffect } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: [],
    bookedSeats: [], 
  });

  useEffect(() => {
    const savedTrip = JSON.parse(localStorage.getItem("trip")) || {};
    setTrip(savedTrip);
  }, []);

  useEffect(() => {
    localStorage.setItem("trip", JSON.stringify(trip));
  }, [trip]);

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
    setTrip((prev) => ({
      ...prev,
      bookedSeats: [...new Set([...prev.bookedSeats, ...seats])],
    }));
  };

  const unbookSeats = (seats) => {
    setTrip((prev) => ({
      ...prev,
      bookedSeats: prev.bookedSeats.filter((seat) => !seats.includes(seat)),
    }));
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
        bookedSeats: trip.bookedSeats,
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