import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../../assets/ADY6.png";
import { FaPhone, FaUser, FaSignOutAlt, FaArrowCircleLeft, FaBars } from 'react-icons/fa';
import Theme from '../theme/Theme';
import './Navbar.css';
import { useTranslation } from 'react-i18next';
import Login from '../login/Login';
import Register from '../register/Register';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const [registerOpen, setRegisterOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        const hasRegistered = localStorage.getItem('hasRegistered');
        if (user) {
            setIsAuthenticated(true);
        } else if (!hasRegistered) {
            setRegisterOpen(true);
        }
    }, []);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const openLogin = () => {
        setLoginOpen(true);
        setRegisterOpen(false);
    };

    const closeLogin = () => {
        setLoginOpen(false);
    };

    const openRegister = () => {
        setRegisterOpen(true);
        setLoginOpen(false);
    };

    const closeRegister = () => {
        setRegisterOpen(false);
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
        localStorage.setItem('user', 'true');
        navigate('/dashboard');
        closeLogin();
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        setRegisterOpen(true);
        setLoginOpen(false);
        navigate('/');
    };

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <nav className='navbar'>
            <Link to="/" className='navbar-logo'>
                <img src={Logo} alt="logo" />
            </Link>

            <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                <FaBars className="icon" />
            </div>

            <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <Link to="/" onClick={() => setLoginOpen(false)} className="navbar-link">
                            {t('home')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/train" onClick={() => setLoginOpen(false)} className="navbar-link">
                            {t('category')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/tikets" onClick={() => setLoginOpen(false)} className="navbar-link">
                            {t('tiсkets')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => setLoginOpen(false)} className="navbar-link">
                            {t("about")}
                        </Link>
                    </li>
                </ul>

                <div className='navbar-link language-toggle'>
                    <button onClick={() => changeLanguage('en')} className="language-button">EN</button>
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
                    <Theme/>
                </div>

                <div className="navbar-actions">
                    {isAuthenticated && (
                        <button onClick={goToDashboard} className="go-to-dashboard-button">
                            <FaArrowCircleLeft className="icon" />
                        </button>
                    )}

                    {isAuthenticated ? (
                        <button onClick={handleLogout} className="logout-button">
                            <FaSignOutAlt className="icon" />
                        </button>
                    ) : (
                        <button onClick={openLogin} className="login-button">
                            <FaUser className="icon" />
                        </button>
                    )}
                </div>
            </div>

            {registerOpen && <Register onClose={closeRegister} openLogin={openLogin} />}
            {loginOpen && <Login onClose={closeLogin} openRegister={openRegister} onLoginSuccess={handleLoginSuccess} />}
        </nav>
    );
};

export default Navbar;
