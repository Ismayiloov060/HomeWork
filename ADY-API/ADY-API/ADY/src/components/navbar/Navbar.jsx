import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/1.webp";
import { LiaTimesSolid } from 'react-icons/lia';
import { FaBars, FaPhone } from 'react-icons/fa6';
import Theme from '../theme/Theme';
import './Navbar.css'; 
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const { t, i18n } = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const handleClick = () => {
        setOpen(!open);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <nav className='navbar'>
            <Link to="/" className='navbar-logo'>
                <img src={Logo} alt="logo" />
            </Link>

            <button onClick={handleClick} className="navbar-toggle">
                {open ? <LiaTimesSolid className='icon' /> : <FaBars className='icon' />}
            </button>

            <div className={`navbar-links ${open ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link to="/" onClick={handleClose} className="navbar-link">
                            {t('home')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/train" onClick={handleClose} className="navbar-link">
                            {t('category')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/tikets" onClick={handleClose} className="navbar-link">
                            {t('tiсkets')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={handleClose} className="navbar-link">
                        
                            {t("about")}
                            
                        </Link>
                    </li>
                
                </ul>

                <div className='navbar-link language-toggle'>
    <button  onClick={() => changeLanguage('en')} className="language-button ">EN</button>
    <button onClick={() => changeLanguage('ru')} className="language-button">RU</button>
</div>


                <div className="navbar-contact">
                    <div className="contact-box">
                        <FaPhone className="contact-icon" />
                        <div className="contact-info">
                            <p className="help-text">{t("help")}</p>
                             
                            <p className="phone-number">+994 99 907 77 07</p>
                        </div>
                    </div>
                    <Theme />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
