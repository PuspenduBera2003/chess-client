import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserProfileCard from '../../User/UserHome/UserProfileCard'
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import './Authenticated.css'
import getTimeOfDay from '../../../utils/getCurrentTime';

const Authenticated = () => {

    const userDetails = useSelector(state => state.Auth.userDetails);

    const theme = useSelector(state => state.Theme.currentTheme);

    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        const time = getTimeOfDay();
        setCurrentTime(time);
    })

    return (
        <div className='flex flex-wrap items-center justify-center relative gap-4 m-2'>
            {
                currentTime === 'morning' &&
                <div className={`hidden md:flex flex-col items-center justify-center gap-2 absolute left-0 greet-card-home-morning p-8 ${theme === 'dark' ? 'dark-greet-card-home-morning' : 'light-greet-card-home-morning'}`}>
                    <LightModeIcon htmlColor='rgb(250 204 21)' style={{ fontSize: '8rem' }} />
                    <div className='text-gray-700 dark:text-gray-200 greet-text-home text-sm font-semibold'>
                        Hey <span className='text-purple-950 dark:text-white font-bold'>{userDetails.username}</span> <br />
                        <span>Good Morning!!</span>
                    </div>
                </div>
            }
            {
                currentTime === 'evening' &&
                <div className={`hidden md:flex flex-col items-center justify-center gap-2 absolute left-0 greet-card-home-night p-8 ${theme === 'dark' ? 'dark-greet-card-home' : 'light-greet-card-home'}`}>
                    <NightsStayIcon htmlColor='rgb(212 212 216)' style={{ fontSize: '8rem' }} />
                    <div className='text-gray-300 greet-text-home text-sm font-semibold'>
                        Hey <span className='font-bold'>{userDetails.username}</span> <br />
                        Good Evening!!
                    </div>
                </div>}
            <UserProfileCard />
        </div>
    )
}

export default Authenticated
