import React from "react";
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Train from '../../assets/train6.png';
import { useTranslation } from 'react-i18next';
import Seat from "../seat/Seat"
import Search from "../search/Search";



const Detail = () => {

    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    return (
        
        <div className='w-full lg:px-26 md:px-16 sm:px-7 px-4 mt-[5ch] mb-[10ch]'>
            <div className="w-full grid grid-cols-2 gap-16 items-center">
                <div className="col-span-1 space-y-8">
                    <img src={Train} alt="detail img" className="w-full aspect-[3/2] rounded-md object-contain pr-[5ch]" />
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
                            Fast Train
                            <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">
                                1518
                            </span>
                        </h1>

                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                                (5.0)
                            </p>
                        </div>
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                         {t("text16")}   
                       </p>
                    </div>
                </div>
                <div className="col-span-1 space-y-10">
                    <div className="space-y-6">
                     <Search/>
                     <Seat/>
                    </div>

                    <div className="flex">
                        <Link to={'/train/train-details/checkout'} className='w-fit bg-violet-600 text neutral-50 font-medium text-base px-6 py-2 rounded-md hover:bg-violet-700 ease-in-out duration-300 ml-8 ' >
                            {t("buy")}
                        </Link>                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail