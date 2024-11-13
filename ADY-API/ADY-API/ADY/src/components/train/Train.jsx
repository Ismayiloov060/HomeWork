import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Search from "../search/Search";
import Seat from "../seat/Seat";
import trainImage6 from '../../assets/train6.png';
import trainImage8 from '../../assets/train8.png';
import trainImage2 from '../../assets/train2.png';
import { useTranslation } from 'react-i18next';



const trainData = [
    {
        id: 1,
        name: "High-speed Train",
        number: "2023",
        image: trainImage6,
        rating: 5.0,
        description: "Comfort and speed on our high-speed train."
    },
    {
        id: 2,
        name: "Luxury Train",
        number: "2021",
        image: trainImage8,
        rating: 4.0,
        description: "Travel with comfort in our luxury train."
    },
    {
        id: 3,
        name: "Private train",
        number: "2020",
        image: trainImage2, 
        rating: 4.0,
        description: "Fast and convenient ride on the express train."
    },
];

const Detail = () => {
    const [selectedTrain, setSelectedTrain] = useState(trainData[0]);

    const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
      i18n.changeLanguage(language);
  };

    return (
        
        <div className='w-full lg:px-26 md:px-16 sm:px-7 px-4 mt-[13ch] mb-[10ch]'>
            <div className="mt-10">
                <h2 className="text-2xl font-bold">{t("choose a train")}</h2>
                <div className="grid grid-cols-3 gap-6 mt-4">
                    {trainData.map(train => (
                        <div 
                            key={train.id} 
                            onClick={() => setSelectedTrain(train)} 
                            className="cursor-pointer p-4 border border-transparent rounded-md hover:shadow-lg transition dark:bg-neutral-900 dark:border-neutral-700"
                        >
                            <img 
                                src={train.image} 
                                alt={train.name} 
                                className={`w-full rounded-md bg-transparent 
                                    ${train.name === "High-speed Train" ? "h-36 mt-4" : "h-40"} 
                                    ${train.name === "double-decker high-speed train" ? "h-40 w-2/4 mx-auto " : "object-contain"}
                                    dark:bg-neutral-900`}
                            />
                            <h3 className="text-lg font-semibold mt-2">{train.name}</h3>
                            <p>{train.number}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-16 items-center -mt-25">
                <div className="col-span-1 space-y-8 -mt-28  dark:bg-neutral-900/40 p-6 rounded-md">
                    <img 
                        src={selectedTrain.image} 
                        alt={`${selectedTrain.name} image`} 
                        className="w-full h-72 object-contain rounded-md bg-transparent  dark:bg-neutral-900/10 " 
                    />
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50">
                            {selectedTrain.name}
                            <span className="text-base font-normal text-neutral-400 dark:text-neutral-500 ml-3">
                                {selectedTrain.number}
                            </span>
                        </h1>
                        <div className="flex items-center gap-x-2">
                            <div className="flex items-center gap-x-1 text-sm text-yellow-500 dark:text-yellow-600">
                                {[...Array(Math.floor(selectedTrain.rating))].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                                ({selectedTrain.rating})
                            </p>
                        </div>
                        <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">
                            {selectedTrain.description}
                        </p>
                    </div>
                </div>
                <div className="col-span-1 space-y-10">
                    <div className="space-y-6">
                        <Search />
                        <Seat />
                    </div>
                    <div className="flex">
                        <Link 
                            to={'/train/train-details/checkout'} 
                            className='w-fit bg-violet-600 text-neutral-50 font-medium text-base px-6 py-2 rounded-md hover:bg-violet-700 ease-in-out duration-300 ml-8' 
                        >
                            {t("buy")}
                        </Link>                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
