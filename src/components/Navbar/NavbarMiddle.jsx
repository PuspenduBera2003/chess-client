import React from 'react';
import { Navbar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { useSelector } from 'react-redux'
import Switcher from '../../theme/Switcher';

const NavbarMiddle = () => {

    const location = useLocation();

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const isDarkMode = (currentTheme === "dark")
        ? 'dark-mode-nav-elements'
        : 'light-mode-nav-elements';

    return (
        <>
            <div className='flex gap-4 items-center justify-center md:hidden'>
                <Switcher />
                <MobileMenu theme={currentTheme} />
            </div>
            <Navbar.Collapse>
                <Link to='/'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect font-semibold ${location.pathname === '/' ? 'activenav' : ''}`}>
                        Home
                    </div>
                </Link>
                <Link to='/about'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect ${location.pathname === '/about' ? 'activenav' : ''}`}>
                        About
                    </div>
                </Link>
                <Link to='/services'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect ${location.pathname === '/services' ? 'activenav' : ''}`}>
                        Services
                    </div>
                </Link>
                <Link to='/pricing'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect ${location.pathname === '/pricing' ? 'activenav' : ''}`}>
                        Pricing
                    </div>
                </Link>
                <Link to='/contact'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect ${location.pathname === '/contact' ? 'activenav' : ''}`}>
                        Contact
                    </div>
                </Link>
            </Navbar.Collapse>
        </>
    );
};

export default NavbarMiddle;