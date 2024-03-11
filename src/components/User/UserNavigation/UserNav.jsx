import React, { useState } from 'react'
import './UserNav.css'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserNav = (props) => {

    const { active } = props;

    const [isActive, setActive] = useState(false);

    const handleToggleClick = () => {
        setActive(!isActive);
    };

    const handleUserNavClick = (event) => {
        const listItems = document.querySelectorAll('.item-list');
        listItems.forEach((item) => item.classList.remove('active'));
        event.currentTarget.classList.add('active');
    };

    const currentTheme = useSelector(state => state.Theme.currentTheme)
    const usernavClasses = (currentTheme === 'dark') ?
        'dark-user-nav' :
        'light-user-nav'

    return (
        <div>
            <div className={`user-navigation bg-gradient-to-r h-full ${usernavClasses}`}>
                <ul>
                    <li className={`item-list ${(active==="home" || !active) && "active"}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/home' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="title">Home</span>
                        </Link>
                    </li>

                    <li className={`item-list ${(active==="profile") && "active"}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/profile' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <span className="title">My Profile</span>
                        </Link>
                    </li>

                    <li className={`item-list ${(active==="messages") && "active"}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/messages' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="chatbubble-outline"></ion-icon>
                            </span>
                            <span className="title">Messages</span>
                        </Link>
                    </li>

                    <li className={`item-list ${(active==="profile") && "settings"}`} onClick={handleUserNavClick}>
                        <Link href='/user/dashboard/settings' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="settings-outline"></ion-icon>
                            </span>
                            <span className="title">Settings</span>
                        </Link>
                    </li>

                    <li className={`item-list ${(active==="password-reset") && "active"}`} onClick={handleUserNavClick}>
                        <Link to="/user/dashboard/password-reset" className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="key-outline"></ion-icon>
                            </span>
                            <span className="title">Password Reset</span>
                        </Link>
                    </li>

                    <li className={`item-list ${(active==="frequently-asked-questions") && "active"}`} onClick={handleUserNavClick}>
                        <Link to="/user/dashboard/frequently-asked-questions" className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="help-outline"></ion-icon>
                            </span>
                            <span className="title">FAQs</span>
                        </Link>
                    </li>

                    <li className={`item-list ${(active==="get-help") && "active"}`} onClick={handleUserNavClick}>
                        <Link to="/user/dashboard/get-help" className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="information-circle-outline"></ion-icon>
                            </span>
                            <span className="title">Help</span>
                        </Link>
                    </li>

                    <li className={`item-list ${(active==="sign-out") && "active"}`} onClick={handleUserNavClick}>
                        <Link to="/user/dashboard/sign-out" className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="arrow-back-circle-outline"></ion-icon>
                            </span>
                            <span className="title">Sign Out</span>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="toggle" onClick={handleToggleClick}>

            </div>
        </div>
    )
}

export default UserNav