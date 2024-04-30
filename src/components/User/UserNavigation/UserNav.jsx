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
            <div className={`user-navigation overflow-y-auto bg-gradient-to-r h-full ${usernavClasses}`}>
                <ul className='pb-2'>
                    <li className={`item-list ${(active === "home" || !active) && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/home' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="home-outline"></ion-icon>
                            </span>
                            <span className="title">Home</span>
                        </Link>
                    </li>

                    <li className={`item-list  ${(active === "profile") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/profile' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="person-outline"></ion-icon>
                            </span>
                            <span className="title">My Profile</span>
                        </Link>
                    </li>

                    <li className={`item-list  ${(active === "games") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/games' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="game-controller-outline"></ion-icon>
                            </span>
                            <span className="title">Games</span>
                        </Link>
                    </li>

                    <li className={`item-list  ${(active === "search") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/search' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="search-outline"></ion-icon>
                            </span>
                            <span className="title">Search User</span>
                        </Link>
                    </li>

                    <li className={`item-list  ${(active === "friends") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/friends' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="people-outline"></ion-icon>
                            </span>
                            <span className="title">Friends</span>
                        </Link>
                    </li>

                    <li className={`item-list  ${(active === "feedback") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to='/user/dashboard/feedback' className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="chatbubble-outline"></ion-icon>
                            </span>
                            <span className="title">Feedback</span>
                        </Link>
                    </li>

                    <li className={`item-list  ${(active === "password-reset") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to="/user/dashboard/password-reset" className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="key-outline"></ion-icon>
                            </span>
                            <span className="title">Password Reset</span>
                        </Link>
                    </li>

                    <li className={`item-list  ${(active === "frequently-asked-questions") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to="/user/dashboard/frequently-asked-questions" className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="help-outline"></ion-icon>
                            </span>
                            <span className="title">FAQs</span>
                        </Link>
                    </li>
                    <li className={`item-list  ${(active === "all") && ((currentTheme === 'dark') ? "dark-active" : 'light-active')}`} onClick={handleUserNavClick}>
                        <Link to="/user/dashboard/all" className='dark:text-white'>
                            <span className="icons">
                                <ion-icon name="options-outline"></ion-icon>
                            </span>
                            <span className="title">All Options</span>
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