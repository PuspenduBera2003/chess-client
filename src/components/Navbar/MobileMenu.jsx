import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileSection from './ProfileSection';
import { useSelector } from 'react-redux'

const MobileMenu = (props) => {

    const { theme } = props;

    const [isMenuOpen, setMenuOpen] = useState(false);

    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

    const openMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const gradientClasses = (theme === "dark")
        ? 'dark-mode-mobile-navbar'
        : 'light-mode-mobile-navbar';

    const hamburgerClasses = (theme === "dark")
        ? 'dark-mode-ham'
        : 'light-mode-ham'

    const navBorderClasses = (theme === "dark")
        ? 'dark-mode-nav-border'
        : 'light-mode-nav-border'


    return (
        <div
            className="navbar block md:hidden">
            <div className='flex gap-2'>
                {
                    isAuthenticated &&
                    <div className='block md:hidden'>
                        <ProfileSection />
                    </div>
                }
                <div
                    className={`icon border border-gray-700 dark:border-white ${isMenuOpen ? 'change' : ''}`}
                    onClick={openMenu}>
                    <div
                        className={`bar ${hamburgerClasses}`}
                        id="bar1">
                    </div>
                    <div
                        className={`bar ${hamburgerClasses}`}
                        id="bar2">
                    </div>
                    <div
                        className={`bar ${hamburgerClasses}`}
                        id="bar3">
                    </div>
                </div>
            </div>
            <ul className={`menu font-semibold dark:border-gray-600 dark:text-white ${isMenuOpen ? 'open' : ''} bg-gradient-to-r ${gradientClasses}`}>
                <li className={navBorderClasses}>
                    <Link to='/' onClick={() => { setMenuOpen(false) }}>
                        Home
                    </Link>
                </li>
                <li className={navBorderClasses} onClick={() => { setMenuOpen(false) }}>
                    <Link to='/about'>
                        About
                    </Link>
                </li>
                <li className={navBorderClasses} onClick={() => { setMenuOpen(false) }}>
                    <Link to="/services">
                        Services
                    </Link>
                </li>
                <li className={navBorderClasses} onClick={() => { setMenuOpen(false) }}>
                    <Link to="/pricing">
                        Pricing
                    </Link>
                </li>
                <li className={navBorderClasses} onClick={() => { setMenuOpen(false) }}>
                    <Link to="/contact">
                        Contact
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default MobileMenu
