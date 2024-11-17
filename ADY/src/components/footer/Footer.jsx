import React from 'react';
import { FaMapPin } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Logo from "../../assets/1.webp";
import './Footer.css'; 
import { useTranslation } from 'react-i18next';


const Footer = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
      i18n.changeLanguage(language);
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">
            <img src={Logo} alt="logo" className="footer-logo-img" />
          </Link>
          <p className="footer-description">
          {t("plan")}
          </p>
        </div>

        <div className="footer-links">
          <h1 className="footer-heading">{t("about us")}</h1>
          <ul className="footer-list">
            <li><Link to="#" className='footer-link'>{t("about us")}</Link></li>
            <li><Link to="#" className='footer-link'>{t("contact us")}</Link></li>
            <li><Link to="#" className='footer-link'>{t("privacy policy")}</Link></li>
            <li><Link to="#" className='footer-link'>{t("terms and conditions")}</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h1 className="footer-heading">{t("services")}</h1>
          <ul className="footer-list">
            <li><Link to="#" className='footer-link'>{t("safety guarantee")}</Link></li>
            <li><Link to="#" className='footer-link'>{t("faq & support")}</Link></li>
            <li><Link to="#" className='footer-link'>{t("luxury train")}</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          
          <div className="footer-contact-info">
            <div className="footer-contact-item">
              <FaMapPin className='footer-contact-icon' />
              <div className="footer-contact-details">
                <p className="footer-contact-label">{t("adress")}</p>
                <p className="footer-contact-address">{t("baku - 28 may")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
