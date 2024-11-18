import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: []
  });

  const updateTrip = (field, value) => {
    setTrip(prev => ({ ...prev, [field]: value }));
  };

  const addSeat = (seatNumber) => {
    setTrip(prev => ({
      ...prev,
      seats: [...prev.seats, seatNumber]
    }));
  };

  const removeSeat = (seatNumber) => {
    setTrip(prev => ({
      ...prev,
      seats: prev.seats.filter(seat => seat !== seatNumber)
    }));
  };

  const seatPrice = 15; 
  const totalPrice = trip.seats.length * seatPrice;

  return (
    <TripContext.Provider value={{ trip, updateTrip, addSeat, removeSeat, totalPrice }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);