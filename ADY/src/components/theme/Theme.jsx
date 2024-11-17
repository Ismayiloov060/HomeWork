import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';
import './Theme.css';

const Theme = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <button onClick={toggleTheme} className='theme-button'>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
    )
}

export default Theme;
