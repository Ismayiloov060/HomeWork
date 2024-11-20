import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTrip } from "../../context/TripContext";

const Search = ({ tripType }) => {
  const { t } = useTranslation();
  const { updateTrip } = useTrip();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const absheronLocations = [
    { value: "Baku", label: t("baku") },
    { value: "Sumqayit", label: t("sumqayit") },
    { value: "Novxani", label: t("novxani") },
    { value: "Goredil", label: t("goredil") },
    { value: "Pirsagi", label: t("pirsagi") },
    { value: "Koroglu", label: t("koroglu") },
  ];

  const intercityLocations = [
    { value: "Baku", label: t("baku") },
    { value: "Ucar", label: t("ucar") },
    { value: "Agdas", label: t("agdas") },
    { value: "Gence", label: t("gence") },
    { value: "Tovuz", label: t("tovuz") },
    { value: "Agstafa", label: t("agstafa") },
  ];

  const locations = tripType === "absheron" ? absheronLocations : intercityLocations;

  const schedule = {
    absheron: {
      Baku: ["07:50", "12:30", "18:00"],
      Sumqayit: ["08:30", "14:00", "19:00"],
      Novxani: ["08:50", "14:30", "19:30"],
      Goredil: ["09:10", "15:00", "20:00"],
      Pirsagi: ["09:40", "15:30", "20:30"],
      Koroglu: ["10:00", "16:00", "21:00"],
    },
    intercity: {
      Baku: ["08:00", "12:00", "16:00"],
      Ucar: ["09:00", "13:00", "17:00"],
      Agdas: ["09:30", "13:30", "17:30"],
      Gence: ["10:00", "14:00", "18:00"],
      Tovuz: ["10:30", "14:30", "18:30"],
      Agstafa: ["11:00", "15:00", "19:00"],
    },
  };

  const handleFromChange = (event) => {
    const selectedFrom = event.target.value;
    setFrom(selectedFrom);
    updateTrip("from", selectedFrom);

    if (schedule[tripType]?.[selectedFrom]) {
      setTime(schedule[tripType][selectedFrom][0]); 
    } else {
      setTime("");
    }

    if (selectedFrom === to) {
      setTo("");
      updateTrip("to", "");
    }
  };

  const handleToChange = (event) => {
    const selectedTo = event.target.value;
    setTo(selectedTo);
    updateTrip("to", selectedTo);
    if (selectedTo === from) {
      setFrom("");
      updateTrip("from", "");
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
    updateTrip("date", selectedDate);
  };

  const handleTimeChange = (event) => {
    const selectedTime = event.target.value;
    setTime(selectedTime);
    updateTrip("time", selectedTime);
  };

  useEffect(() => {
    
    const currentDate = new Date().toISOString().split("T")[0]; 
    setDate(currentDate);
  }, []);

  const currentDate = new Date().toISOString().split("T")[0]; 

  return (
    <div className="w-full flex justify-center my-[8ch]">
      <div className="w-full max-w-4xl bg-neutral-100 rounded-md dark:bg-neutral-900/40 p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-10 gap-y-12 items-end">
          <div>
            <label htmlFor="from" className="block mb-2 font-semibold">
              {t("from")}
            </label>
            <select
              name="from"
              id="from"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              value={from}
              onChange={handleFromChange}
            >
              <option value="">{t("select location")}</option>
              {locations
                .filter((location) => location.value !== to)
                .map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="to" className="block mb-2 font-semibold">
              {t("to")}
            </label>
            <select
              name="to"
              id="to"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              value={to}
              onChange={handleToChange}
            >
              <option value="">{t("select location")}</option>
              {locations
                .filter((location) => location.value !== from)
                .map((location) => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="date" className="block mb-2 font-semibold">
              {t("choose date")}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              value={date}
              onChange={handleDateChange}
              min={currentDate} 
            />
          </div>

          <div>
            <label htmlFor="time" className="block mb-2 font-semibold">
              {t("choose time")}
            </label>
            <select
              id="time"
              name="time"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900"
              value={time}
              onChange={handleTimeChange}
            >
              <option value="">{t("select time")}</option>
              {schedule[tripType]?.[from]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;