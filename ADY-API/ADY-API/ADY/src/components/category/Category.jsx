import React from 'react';
import { Link } from 'react-router-dom';
import Baku from "../../assets/Baku.png";
import Aze from "../../assets/Aze.png";
import { useTranslation } from 'react-i18next';
import './Category.css';
import { SiAzureartifacts, SiAzuredataexplorer } from 'react-icons/si';

const Category = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    return (
        <div className='category-container'>
            
            <div className="category-grid">
                <Link to={"/train/train-details"} className='category-item'>
                <img src={Baku} alt="train img" className="train-img" />
                    <div className="overlay">
                        <h2 className="train-name">{t("absheron")}</h2>
                    </div>
                </Link>

                <Link to={"/train/train-details"} className='category-item'>
                <img src={Aze} alt="train img" className="train-img" />
                    <div className="overlay">
                        <h2 className="train-name">{t("regional")}</h2>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Category;
