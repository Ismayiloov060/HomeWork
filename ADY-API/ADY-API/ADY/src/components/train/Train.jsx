import React from 'react';
import { Link } from 'react-router-dom';
import Baku from "../../assets/Baku.png";
import Aze from "../../assets/Aze.png";
import { useTranslation } from 'react-i18next';
import './Train.css';
import { SiAzureartifacts, SiAzuredataexplorer } from 'react-icons/si';

const Train = () => {
    const { t, i18n } = useTranslation();
    

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    
    return (
        <div className='container-category'>
            <div className="grid-category">
                <Link to={"/detail/absheron"} className='item-category'>
                    <img src={Baku} alt="train img" className="img-train" />
                    <div className="overlay-item">
                        <h2 className="name-train">{t("absheron")}</h2>
                    </div>
                </Link>

                <Link to={"/detail/intercity"} className='item-category'>
                    <img src={Aze} alt="train img" className="img-train" />
                    <div className="overlay-item">
                        <h2 className="name-train">{t("regional")}</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Train;
