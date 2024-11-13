import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Search = () => {
    const { t, i18n } = useTranslation();
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const locations = [
        { value: "location1", label: t("baku") },
        { value: "location2", label: t("ucar") },
        { value: "location3", label: t("agdas") },
        { value: "location4", label: t("gence") },
        { value: "location5", label: t("tovuz") },
        { value: "location6", label: t("agstafa") }
    ];

    const handleFromChange = (event) => {
        setFrom(event.target.value);
        if (event.target.value === to) {
            setTo('');
        }
    };

    const handleToChange = (event) => {
        setTo(event.target.value);
        if (event.target.value === from) {
            setFrom('');
        }
    };

    return (
        <div className='w-full flex justify-center my-[8ch]'>
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
                                .filter(location => location.value !== to)
                                .map(location => (
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
                                .filter(location => location.value !== from)
                                .map(location => (
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
                        <input type="date" id="date" name="date" className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900" />
                    </div>

                    <div>
                        <label htmlFor="time" className="block mb-2 font-semibold">
                            {t("choose time")}
                        </label>
                        <input type="time" id="time" name="time" className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 inline-block bg-neutral-200/60 dark:bg-neutral-900/60 px-3 h-12 border border-neutral-200 dark:border-neutral-900 rounded-md focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-900" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
