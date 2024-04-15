import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserProfileCard from '../UserHome/UserProfileCard'
import UserDetails from '../UserProfile/UserDetails'
import UserGamePanel from '../UserGame/UserGamePanel'
import SearchPanel from '../UserSearch/SearchPanel'
import UserFriendPanel from '../UserFriend/UserFriendPanel'
import UserFeedbackPanel from '../UserFeedback/UserFeedbackPanel'
import calculateTopValue from '../../../utils/calculateTopValue'

const UserSettings = () => {
    const currentTheme = useSelector(state => state.Theme.currentTheme)

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'bg-white'

    const [active, setActive] = useState('home');
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const theme = useSelector(state => state.Theme.currentTheme);

    const bgColor = (theme === 'dark') ?
        'bg-zinc-900' : 'bg-zinc-100'

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section className={`user-right-panel border-l bg-gradient-to-r dark:border-gray-700 z-0 ${userHomeClasses}`}>
            <div className='flex flex-col gap-2 w-full relative mb-6' style={{ minHeight: 'calc(100vh - 3.75rem)' }}>
                <div className='flex flex-wrap w-full p-2 gap-4 items-center justify-center bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-800 shadow-md'>
                    <div
                        onClick={() => setActive('home')}
                        className={`dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center border dark:border-gray-600 p-2 rounded-md ${active === 'home' ? 'bg-gray-200 dark:bg-gray-700' : bgColor}`}>
                        <span className="flex items-center justify-center mr-1">
                            <ion-icon name="home-outline"></ion-icon>
                        </span>
                        <span className="title">Home</span>
                    </div>
                    <div
                        onClick={() => setActive('profile')}
                        className={`dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center border dark:border-gray-600 p-2 rounded-md ${active === 'profile' ? 'bg-gray-200 dark:bg-gray-700' : bgColor}`}>
                        <span className="flex items-center justify-center mr-1">
                            <ion-icon name="person-outline"></ion-icon>
                        </span>
                        <span className="title">My Profile</span>
                    </div>
                    <div
                        onClick={() => setActive('games')}
                        className={`dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center border dark:border-gray-600 p-2 rounded-md ${active === 'games' ? 'bg-gray-200 dark:bg-gray-700' : bgColor}`}>
                        <span className="flex items-center justify-center mr-1">
                            <ion-icon name="game-controller-outline"></ion-icon>
                        </span>
                        <span className="title">Games</span>
                    </div>
                    <div
                        onClick={() => setActive('search')}
                        className={`dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center border dark:border-gray-600 p-2 rounded-md ${active === 'search' ? 'bg-gray-200 dark:bg-gray-700' : bgColor}`}>
                        <span className="flex items-center justify-center mr-1">
                            <ion-icon name="search-outline"></ion-icon>
                        </span>
                        <span className="title">Search User</span>
                    </div>
                    <div
                        onClick={() => setActive('friends')}
                        className={`dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center border dark:border-gray-600 p-2 rounded-md ${active === 'friends' ? 'bg-gray-200 dark:bg-gray-700' : bgColor}`}>
                        <span className="flex items-center justify-center mr-1">
                            <ion-icon name="people-outline"></ion-icon>
                        </span>
                        <span className="title">Friends</span>
                    </div>
                    <div
                        onClick={() => setActive('feedbacks')}
                        className={`dark:text-white cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center border dark:border-gray-600 p-2 rounded-md ${active === 'feedbacks' ? 'bg-gray-200 dark:bg-gray-700' : bgColor}`}>
                        <span className="flex items-center justify-center mr-1">
                            <ion-icon name="chatbubble-outline"></ion-icon>
                        </span>
                        <span className="title">Feedbacks</span>
                    </div>
                </div>
                <div className='p-1'>
                    {
                        active === 'home' &&
                        <UserProfileCard />
                    }
                    {
                        active === 'profile' &&
                        <UserDetails />
                    }
                    {
                        active === 'games' &&
                        <div style={{ marginRight: '2.5rem' }}>
                            <UserGamePanel />
                        </div>
                    }
                    {
                        active === 'search' &&
                        <SearchPanel />
                    }
                    {
                        active === 'friends' &&
                        <UserFriendPanel top={calculateTopValue(windowWidth)} />
                    }
                    {
                        active === 'feedbacks' &&
                        <UserFeedbackPanel top={calculateTopValue(windowWidth)} />
                    }
                </div>
            </div>
        </section>
    )
}

export default UserSettings
