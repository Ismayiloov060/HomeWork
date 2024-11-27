import React from "react";
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Train from '../../assets/train6.png';
import { useTranslation } from 'react-i18next';
import Seat from "../seat/Seat";
import Search from "../search/Search";

const Detail = () => {
    const { t } = useTranslation();
    const { tripType } = useParams();  
    const [selectedSeats, setSelectedSeats] = React.useState([]);

    // Функция для обновления выбранных мест
    const handleSeatSelection = (seats) => {
        setSelectedSeats(seats);
    };

    return (
        <div className='w-full lg:px-26 md:px-16 sm:px-7 px-4 mt-[5ch] mb-[10ch]'>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 items-center">
                <div className="col-span-1 space-y-8">
                    <img 
                        src={Train} 
                        alt="detail img" 
                        className="w-full aspect-[3/2] rounded-md object-contain"
                    />
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-50 text-left">
                            {t("fast train")}
                            <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">1518</span>
                        </h1>
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStar />
                            </div>
                            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">(5.0)</p>
                        </div>
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">{t("text16")}</p>
                    </div>
                </div>

                <div className="col-span-1 space-y-10">
                    <div className="space-y-6">
                        <Search tripType={tripType} />
                        <Seat onSeatSelection={handleSeatSelection} />  {/* Передаем функцию для обновления выбранных мест */}
                    </div>
                    <div className="flex justify-start">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
