import React from 'react'
import UserNav from './UserNavigation/UserNav'
import MobileUserNav from './UserNavigation/MobileUserNav'
import UserHome from './UserHome/UserHome'
import { useParams } from 'react-router-dom'
import UserProfile from './UserProfile/UserProfile'

const User = () => {

    const { tab } = useParams();

    return (
        <div className='overflow-hidden'>
            <div className='hidden md:block'>
                <UserNav active={tab} />
            </div>
            <div className='block md:hidden'>
                <MobileUserNav />
            </div>
            {
                (!tab || tab === "home") &&
                <UserHome />
            }
            {
                tab === "profile" && <UserProfile />
            }
        </div>
    )
}

export default User
