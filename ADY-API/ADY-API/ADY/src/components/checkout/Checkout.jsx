import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useTrip } from "../../context/TripContext";

const Checkout = () => {
  const { t } = useTranslation();
  const { trip } = useTrip();

  if (!trip.from || !trip.to || !trip.date || !trip.time) {
    return <div>Loading...</div>;
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/g, "");
  };

  return (
    <div className="w-full lg:px-28 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[8ch] space-y-10">
      <div className="grid grid-cols-5 gap-16 items-start">
        <div className="col-span-3 space-y-7 pr-20">
          <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
            {t("passenger information")}
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="fullname" className="block mb-2 font-semibold">
                {t("fullname")}
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                className="w-full px-4 py-3 bg-neutral-200/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                placeholder={t("Enter Full Name")}
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2 font-semibold">
                {t("email address")}
              </label>
              <input
                type="email"
                id="email"
                placeholder="e.g. gtech.official08@gmail.com"
                name="email"
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
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
                className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all duration-200"
                placeholder="e.g. +(994) 12-345-67-89"
                onInput={handlePhoneChange}
              />
            </div>
          </form>
        </div>

        <div className="col-span-2 space-y-8">
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
                  <div className="w-full flex items-center justify-between">
                    <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                      {t("total number of seats")}
                    </h6>
                    <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                      10 
                    </h6>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                      {t("total amount")}
                    </h6>
                    <h6 className="text-base text-neutral-700 dark:text-neutral-200 font-medium">
                      5000
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="w-full px-8 h-12 bg-violet-600 text-neutral-50 text-base font-normal rounded-md flex items-center justify-center gap-x-2 transform transition-all duration-300 hover:scale-105 hover:bg-violet-700">
            {t("proceed to pay")} <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;