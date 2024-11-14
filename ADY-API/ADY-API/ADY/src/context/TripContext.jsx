import React, { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trip, setTrip] = useState({
    from: "",
    to: "",
    date: "",
    time: ""
  });

  const updateTrip = (field, value) => {
    setTrip(prev => ({ ...prev, [field]: value }));
  };

  return (
    <TripContext.Provider value={{ trip, updateTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);