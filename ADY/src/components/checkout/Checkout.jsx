import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTrip } from "../../context/TripContext";
import axios from "axios";

const Checkout = () => {
  const { trip, totalPrice, updateTrip } = useTrip();
  const { t } = useTranslation();
  const [emailSent, setEmailSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [emailSentMessage, setEmailSentMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedTrip = JSON.parse(localStorage.getItem("trip"));
    const savedTotalPrice = localStorage.getItem("totalPrice");

    if (savedTrip) {
      updateTrip("from", savedTrip.from);
      updateTrip("to", savedTrip.to);
      updateTrip("date", savedTrip.date);
      updateTrip("time", savedTrip.time);
      updateTrip("seats", savedTrip.seats);
    }

    if (savedTotalPrice) {
      updateTrip("totalPrice", savedTotalPrice);
    }

    localStorage.removeItem("bookedSeats");
  }, [updateTrip]);

  const sendEmailAndSaveTicket = async (fullname, email, phone) => {
    try {
    
      const ticketResponse = await axios.post(
        "https://localhost:7261/api/Tickets/Create",
        {
          fullName: fullname,
          email: email,
          from: trip.from,
          to: trip.to,
          date: trip.date,
          time: trip.time,
          seats: trip.seats.join(", "),
          totalPrice: totalPrice,
          userId: 1,
        }
      );

      console.log("Ticket saved:", ticketResponse.data);

      
      const emailResponse = await axios.post("http://localhost:5000/send-email", {
        fullname,
        email,
        phone,
        trip,
        totalPrice,
      });

      console.log("Email sent:", emailResponse.data);

    
      setEmailSent(true);
      setEmailSentMessage(t("Email sent and ticket saved successfully!"));
      setTimeout(() => {
        setEmailSentMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving ticket or sending email:", error);
      setErrorMessage(t("Failed to save ticket or send email"));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    updateTrip("bookedSeats", trip.seats);
    localStorage.setItem("bookedSeats", JSON.stringify(trip.seats));
    setSuccessMessage(t("Seats have been booked!"));

  
    sendEmailAndSaveTicket(fullname, email, phone);

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  if (!trip.from || !trip.to || !trip.date || !trip.time) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-3 space-y-7 lg:pr-20">
          <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
            {t("passenger information")}
          </h2>
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="fullname" className="block mb-2 font-semibold">
                {t("fullname")}
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full px-4 py-3 bg-neutral-200/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c87] transition-all duration-200"
                placeholder={t("Enter Full Name")}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                {t("email address")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. example@gmail.com"
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c87] transition-all duration-200"
                required
              />
              <small className="block mt-1 text-xs text-neutral-500 dark:text-neutral-600 font-normal">
                {t("You will get your tickets via this email address.")}
              </small>
            </div>

            <div>
              <label htmlFor="phone" className="block mb-2 font-semibold">
                {t("phone number")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d5c87] transition-all duration-200"
                placeholder="e.g. 0999077707"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 h-12 bg-[#1d5c87] text-neutral-50 text-base font-normal rounded-md flex items-center justify-center gap-x-2 transform transition-all duration-300 hover:scale-105 hover:bg-[#1d5c87]"
            >
              {t("buy ticked")}
              <FaArrowRight />
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 lg:sticky lg:top-28 space-y-8 lg:mt-0 mt-10">
          <div className="bg-neutral-200/50 dark:bg-neutral-900/70 rounded-md py-5 px-7 space-y-6">
            <h2 className="text-xl text-center text-neutral-800 dark:text-neutral-100 font-medium border-b-2 border-neutral-200 dark:border-neutral-800/40 pb-3 mb-4">
              {t("your booking status")}
            </h2>

            <div className="space-y-8 pb-3">
              <div className="space-y-4">
                <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                  {t("your destination")}
                </h6>

                <div className="w-full flex items-center gap-x-3">
                  <div className="w-fit text-base font-medium">
                    {t("from")}:- <span className="ml-1.5">{trip.from}</span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-[1px] border border-dashed border-neutral-400 dark:border-neutral-700/80"></div>
                  </div>
                  <div className="w-fit text-base font-medium">
                    {t("to")}:- <span className="ml-1.5">{trip.to}</span>
                  </div>
                </div>

                <div className="w-full flex items-center gap-x-3">
                  <div className="w-fit text-base font-medium">
                    {t("date")}:- <span className="ml-1.5">{trip.date}</span>
                  </div>
                </div>

                <div className="w-full flex items-center gap-x-3">
                  <div className="w-fit text-base font-medium">
                    {t("time")}:- <span className="ml-1.5">{trip.time}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                    {t("selected seats")}
                  </h6>
                  {trip.seats?.length > 0 ? (
                    <div className="flex items-center gap-2 flex-wrap">
                      {trip.seats.map((seat, index) => (
                        <span
                          key={index}
                          className="bg-neutral-300 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-neutral-400">
                      {t("No seats selected.")}
                    </div>
                  )}
                </div>
              </div>
              <div className="w-full flex items-center gap-x-3">
                <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                  {t("Total Price:")}
                </h6>
                <div className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                  {totalPrice} AZN
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {emailSentMessage && (
        <div className="fixed bottom-10 left-10 bg-green-600 text-white py-2 px-4 rounded-md">
          {emailSentMessage}
        </div>
      )}
      {errorMessage && (
        <div className="fixed bottom-10 left-10 bg-red-600 text-white py-2 px-4 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Checkout;