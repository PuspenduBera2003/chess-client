import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const UserProfileCard = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);

    };

    const handleImageError = () => {
        setImageError(true);
    };

    const animationProps = useSpring({
        from: { transform: 'translateY(50px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: { tension: 300, friction: 10 },
    });

    const name = userDetails.username

    const userJoiningTime = '29.02.2024'


    const contentBoxClasses = (currentTheme === 'dark') ?
        'dark-content-box' :
        'light-content-box'

    const profileCardClasses = (currentTheme === 'dark') ?
        'dark-profile-card dark-mode-shadow' :
        'light-profile-card'

    return (
        <div className="profile-card-container">
            <animated.div
                style={animationProps}
                className={`profile-card ${profileCardClasses} border rounded-lg`}>
                <div className="img-box">
                    <img
                        src={userDetails.profile_photo}
                        alt={name}
                        style={{ borderRadius: '50%' }}
                        className={`${!imageLoaded ? 'hidden' : 'block'} rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
                        onLoad={handleImageLoad}
                        onError={handleImageError} />
                    {
                        !imageLoaded &&
                        <div className="flex items-center ring-2 ring-gray-300 dark:ring-gray-500 rounded-full">
                            <svg className="text-gray-400 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style={{width: 150, height: 150}} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </div>
                    }
                </div>
                <div className={`content-box ${contentBoxClasses}`}>
                    <h2 className='font-bold dark:text-white'>
                        {name}
                    </h2>
                    <p className='text-md dark:text-white' style={{ textTransform: 'uppercase' }}>
                        {`You have joined us ${userJoiningTime} as an user, since then we are Family`}
                    </p>
                    <div className="action-buttons">
                        <Link to="/user/dashboard/profile" className="btn vp">View Profile</Link>
                        <Link to="/game" className="btn pm">Play a Match</Link>
                    </div>
                </div>
            </animated.div>
        </div>
    )
}

export default UserProfileCard
