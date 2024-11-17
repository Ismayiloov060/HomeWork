import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Baku from "../../assets/Baku.png";
import Aze from "../../assets/Aze.png";
import { useTranslation } from 'react-i18next';
import { FaTrain, FaCity } from 'react-icons/fa';
import './Train.css';

const Train = () => {
    const { t } = useTranslation();
    
    const [isAbsheronOpen, setIsAbsheronOpen] = useState(false);
    const [isRegionalOpen, setIsRegionalOpen] = useState(false);

    const toggleAbsheronInfo = () => {
        setIsAbsheronOpen(prevState => !prevState);
        if (isRegionalOpen) {
            setIsRegionalOpen(false);
        }
    };

    const toggleRegionalInfo = () => {
        setIsRegionalOpen(prevState => !prevState);
        if (isAbsheronOpen) {
            setIsAbsheronOpen(false);
        }
    };

    return (
        <div className='container-category'>
            <div className="header-category">
                <h1 className="title-category">{t("choose category")}</h1>
            </div>

            <div className="grid-category">
                <div className="category-item">
                    <Link to={"/detail/absheron"} className='item-category'>
                        <img src={Baku} alt={t("absheron")} className="img-train" />
                        <div className="overlay-item">
                            <h2 className="name-train">{t("absheron")}</h2>
                            <FaTrain className="category-icon" />
                        </div>
                    </Link>
                    <button 
                        className="info-button-absheron" 
                        onClick={toggleAbsheronInfo} 
                        aria-expanded={isAbsheronOpen}
                    >
                        {isAbsheronOpen ? t("hideInfo") : t("showInfo")}
                    </button>
                    <div className={`info-text ${isAbsheronOpen ? 'show' : 'hide'}`}>
                        <p>{t("absheronTrain")}</p>
                        <p>
                            Absheron Train provides a premium, comfortable ride from Baku to the surrounding regions. 
                            The train offers spacious seats, air conditioning, and onboard amenities, ensuring a pleasant 
                            journey for travelers.
                        </p>
                    </div>
                </div>

                <div className="category-item">
                    <Link to={"/detail/intercity"} className='item-category'>
                        <img src={Aze} alt={t("regional")} className="img-train-regional" />
                        <div className="overlay-item">
                            <h2 className="name-train">{t("regional")}</h2>
                            <FaCity className="category-icon" />
                        </div>
                    </Link>
                    <button 
                        className="info-button-regional" 
                        onClick={toggleRegionalInfo} 
                        aria-expanded={isRegionalOpen}
                    >
                        {isRegionalOpen ? t("hideInfo") : t("showInfo")}
                    </button>
                    <div className={`info-text ${isRegionalOpen ? 'show' : 'hide'}`}>
                        <p>{t("regionalTrain")}</p>
                        <p>
                            The Regional Train connects major cities and regions within Azerbaijan. 
                            It offers a reliable, fast, and comfortable service with multiple stops along the way. 
                            With a focus on safety and customer service, the Regional Train is perfect for both business and leisure travelers.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Train;
