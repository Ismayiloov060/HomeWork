import React from 'react';
import { Link } from 'react-router-dom';
import Baku from "../../assets/Baku.png";
import Aze from "../../assets/Aze.png";
import { useTranslation } from 'react-i18next';
import './Category.css';

const Category = () => {
    const { t } = useTranslation();

    return (
        <div className='category-container'>
            <div className="category-grid">
                <Link to="/detail/absheron" className='category-item'>
                    <img src={Baku} alt="train img" className="train-img" />
                    <div className="overlay">
                        <h2 className="train-name">{t("absheron")}</h2>
                    </div>
                </Link>

                <Link to="/detail/intercity" className='category-item'>
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
