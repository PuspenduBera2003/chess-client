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
                <MobileMenu theme={currentTheme} />
            </div>
            <Navbar.Collapse>
                <Link to='/home'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect font-semibold ${location.pathname === '/home' ? 'activenav' : ''}`}>
                        Home
                    </div>
                </Link>
                <Link to='/about-us'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect ${location.pathname === '/about-us' ? 'activenav' : ''}`}>
                        About Us
                    </div>
                </Link>
                <Link to='/game'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect ${location.pathname === '/game' ? 'activenav' : ''}`}>
                        Games
                    </div>
                </Link>
                <Link to='/frequently-asked-questions'>
                    <div className={`nav-elements ${isDarkMode} dark:text-white underline-hover-effect ${location.pathname === '/frequently-asked-questions' ? 'activenav' : ''}`}>
                        FAQ's
                    </div>
                </Link>
            </Navbar.Collapse>
        </>
    );
};

export default NavbarMiddle;