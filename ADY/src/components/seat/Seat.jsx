import React, { useState, useEffect } from "react";
import { MdOutlineChair } from "react-icons/md";
import { useTrip } from "../../context/TripContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Seat = ({ seatNumber, isSelected, isBooked, onClick }) => {
  let seatColor = "";
  if (isBooked) {
    seatColor = "text-red-500";
  } else if (isSelected) {
    seatColor = "text-[#1d5c87]";
  } else {
    seatColor = "text-neutral-600";
  }

  return (
    <MdOutlineChair
      className={`text-3xl -rotate-90 cursor-pointer ${seatColor}`}
      onClick={isBooked ? null : onClick}
    />
  );
};

const TrainSeatLayout = () => {
  const totalSeats = 41;
  const { trip, updateTrip } = useTrip();
  const { t } = useTranslation();

  useEffect(() => {
    const savedSeats = JSON.parse(localStorage.getItem("selectedSeats")) || [];
    updateTrip("seats", savedSeats);
  }, [updateTrip]);

  const handleSeatClick = (seatNumber) => {
    if (trip.bookedSeats.includes(seatNumber)) {
      return;
    }

    let updatedSeats = [...trip.seats];
    if (updatedSeats.includes(seatNumber)) {
      updatedSeats = updatedSeats.filter((seat) => seat !== seatNumber);
    } else {
      if (updatedSeats.length < 5) {
        updatedSeats.push(seatNumber);
      } else {
        alert("Вы можете выбрать только 5 мест");
        return;
      }
    }

    updateTrip("seats", updatedSeats);
    const totalPrice = updatedSeats.length * 15;
    updateTrip("totalPrice", totalPrice);
    localStorage.setItem("selectedSeats", JSON.stringify(updatedSeats));
    localStorage.setItem("totalPrice", totalPrice);
  };

  const renderSeats = () => {
    let seats = [];
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Seat
          key={i}
          seatNumber={i}
          isSelected={trip.seats.includes(i)}
          isBooked={trip.bookedSeats.includes(i)}
          onClick={() => handleSeatClick(i)}
        />
      );
    }
    return seats;
  };

  const availableSeats = trip.seats.filter(seat => !trip.bookedSeats.includes(seat));

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        {t("choose a seat")}
      </h2>

      <div className="w-full flex flex-col lg:flex-row justify-between">
        <div className="flex-1 flex">
          <div className="w-full flex-1 flex gap-x-4 items-stretch">
            <div className="w-10 h-full border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
              <MdOutlineChair className="text-3xl mr-1 mt-6 text-[#1d5c87] -rotate-90" />
            </div>

            <div className="flex flex-col items-center">
              <div className="flex-1 space-y-4">
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {renderSeats().slice(0, 10)}
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {renderSeats().slice(10, 20)}
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  <div className="col-span-9"></div>
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {renderSeats().slice(20, 30)}
                </div>
                <div className="w-full grid grid-cols-10 gap-x-3">
                  {renderSeats().slice(30, 40)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="seat-info flex flex-col space-y-4 w-28 lg:ml-8 lg:mt-0 mt-6">
          <div className="flex items-center gap-x-2">
            <MdOutlineChair className="text-lg text-neutral-500 -rotate-90" />
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
              - {t("available")}
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            <MdOutlineChair className="text-lg text-red-500 -rotate-90" />
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
              - {t("booked")}
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            <MdOutlineChair className="text-lg text-[#1d5c87] -rotate-90" />
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
              - {t("selected")}
            </p>
          </div>
        </div>
      </div>

      {availableSeats.length > 0 && (
        <div className="!mt-10">
          <h3 className="text-lg font-bold">{t("selected seats:")}</h3>
          <div className="flex flex-wrap">
            {availableSeats.map((seat) => (
              <div
                key={seat}
                className="w-10 h-10 rounded-md m-1.5 text-lg font-medium bg-[#1d5c87] text-white flex items-center justify-center"
              >
                {seat}
              </div>
            ))}
          </div>
        </div>
      )}

      {availableSeats.length > 0 && (
        <div className="!mt-5 flex items-center gap-x-1">
          <h3 className="text-lg font-bold">{t("total price:")}</h3>
          <p className="text-lg font-medium">{availableSeats.length * 15}₼</p>
        </div>
      )}

      <div className="mt-6">
        <Link
          to="/checkout"
          className={`w-full bg-[#1d5c87] text-white font-medium text-base px-6 py-2 rounded-md text-center ${availableSeats.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ pointerEvents: availableSeats.length === 0 ? 'none' : 'auto' }}
        >
          {t("buy")}
        </Link>
      </div>
    </div>
  );
};

export default TrainSeatLayout;