import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTrip } from "../../context/TripContext";
import axios from "axios";

const Checkout = () => {
  const { trip, totalPrice, updateTrip } = useTrip();
  const { t } = useTranslation();
  const [emailSent, setEmailSent] = useState(false);

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
  }, [updateTrip]);

  const sendEmail = async (fullname, email, phone) => {
    try {
      await axios.post("http://localhost:5000/send-email", {
        fullname,
        email,
        phone,
        trip,
        totalPrice,
      });
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending email:", error);
      alert(t("Failed to send email"));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const fullname = e.target.fullname.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;

    
    sendEmail(fullname, email, phone);
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
              {t("Buy Ticket")}
              <FaArrowRight />
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 lg:sticky lg:top-28 space-y-8 lg:mt-0 mt-10">
          <div className="bg-neutral-200/50 dark:bg-neutral-900/70 rounded-md py-5 px-7">
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
                  {trip.seats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {trip.seats.map((seat, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 bg-[#1d5c87] text-white rounded-md"
                        >
                          {seat}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{t("No seats selected")}</p>
                  )}
                </div>

                <div className="w-full flex justify-between items-center mt-5 border-t border-neutral-200 dark:border-neutral-800/40 pt-5">
                  <h6 className="text-base font-medium text-neutral-800 dark:text-neutral-100">
                    {t("total price")}:
                  </h6>
                  <div className="flex items-center gap-2">
                    <h6 className="text-xl font-bold text-[#1d5c87]">
                      {totalPrice} ₼
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {emailSent && (
            <div className="text-center text-green-500">
              {t("Email has been sent!")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
