import React from 'react'
import { useSpring, animated } from 'react-spring';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const BouncingDiv = () => {

    const bounceAnimation = useSpring({
        from: { transform: 'scale(0.8)', opacity: 0 },
        to: { transform: 'scale(1)', opacity: 1 },
        config: { tension: 200, friction: 10 },
    });

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const isDarkMode = (currentTheme === "dark")
        ? 'dark-mode-feature-card'
        : 'light-mode-bouncing-div';

    return (
        <animated.div style={{ ...bounceAnimation }}>
            <span className="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-gray-900 bg-gray-100 rounded-full dark:bg-gray-900 dark:text-gray-100 border border-gray-600 dark:border-gray-600">
                <i className="fa-solid fa-chess-king"></i>
                <span className="sr-only">Icon description</span>
            </span>
            <div className={`w-52 text-gray-900 border border-gray-200 rounded-lg ${isDarkMode} dark:text-white bg-gradient-to-r border border-gray-700 dark:border-gray-400`}>
                <Link to='/game/passplay' className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-700 rounded-t-lg  dark:border-gray-500 ">
                    <i className="fa-solid fa-chess-board mr-2"></i>
                    Pass & Play
                </Link>
                <Link to='/' className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-700 rounded-t-lg  dark:border-gray-500">
                    <i className="fa-solid fa-chess-knight mr-2"></i>
                    Play With Computer
                </Link>
                <Link to='/game/play-with-friends' className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-700 rounded-t-lg  dark:border-gray-500">
                    <i className="fa-solid fa-chess mr-2"></i>
                    Play With Friends
                </Link>
                <Link to='/' className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-t-lg  dark:border-gray-600">
                    <i className="fa-solid fa-chess-bishop mr-2"></i>
                    Play With Random User
                </Link>
            </div>
        </animated.div>
    )
}

export default BouncingDiv
