import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileSection from './ProfileSection';
import { useSelector } from 'react-redux';

const MobileMenu = (props) => {
    const { theme } = props;
    const [isMenuOpen, setMenuOpen] = useState(false);
    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);
    const menuRef = useRef(null);

    const openMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/auth/signin');
        closeMenu();
    }

    const handleSignUp = () => {
        navigate('/auth/signup');
        closeMenu();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const gradientClasses = theme === 'dark' ? 'dark-mode-mobile-navbar' : 'light-mode-mobile-navbar';
    const hamburgerClasses = theme === 'dark' ? 'dark-mode-ham' : 'light-mode-ham';
    const navBorderClasses = theme === 'dark' ? 'dark-mode-nav-border' : 'light-mode-nav-border';

    return (
        <div className="navbar block md:hidden" ref={menuRef}>
            <div className="flex gap-2">
                {isAuthenticated && (
                    <div className="block md:hidden">
                        <ProfileSection />
                    </div>
                )}
                <div className={`icon border border-gray-700 dark:border-white ${isMenuOpen ? 'change' : ''}`} onClick={openMenu}>
                    <div className={`bar ${hamburgerClasses}`} id="bar1"></div>
                    <div className={`bar ${hamburgerClasses}`} id="bar2"></div>
                    <div className={`bar ${hamburgerClasses}`} id="bar3"></div>
                </div>
            </div>
            <ul className={`menu border dark:border-gray-600 font-semibold dark:text-white ${isMenuOpen ? 'open' : ''} bg-gradient-to-r ${gradientClasses}`}>
                <li className={navBorderClasses}>
                    <Link to="/" onClick={closeMenu}>
                        Home
                    </Link>
                </li>
                <li className={navBorderClasses}>
                    <Link to="/about-us" onClick={closeMenu}>
                        About Us
                    </Link>
                </li>
                <li className={navBorderClasses}>
                    <Link to="/game" onClick={closeMenu}>
                        Games
                    </Link>
                </li>
                <li className={navBorderClasses}>
                    <Link to="/frequently-asked-questions" onClick={closeMenu}>
                        FAQ's
                    </Link>
                </li>
                {
                    !isAuthenticated ?
                        <li className="navBorderClasses border-b border-gray-700-2">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={handleSignIn}>
                                Sign In
                            </button>
                        </li> : ''
                }
                {
                    !isAuthenticated ?
                        <li className="navBorderClasses">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={handleSignUp}>
                                Sign Up
                            </button>
                        </li> : ''
                }
            </ul>
        </div>
    );
};

export default MobileMenu;
