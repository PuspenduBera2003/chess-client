import React from 'react'
import UserNav from './UserNavigation/UserNav'
import MobileUserNav from './UserNavigation/MobileUserNav'
import UserHome from './UserHome/UserHome'
import { useParams } from 'react-router-dom'
import UserProfile from './UserProfile/UserProfile'
import UserSearch from './UserSearch/UserSearch'
import UserFriend from './UserFriend/UserFriend'
import UserFeedback from './UserFeedback/UserFeedback'
import UserGame from './UserGame/UserGame'
import UserSettings from './UserSettings/UserSettings'
import UserPWReset from './UserPWReset/UserPWReset'

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
            {
                tab === "search" && <UserSearch />
            }
            {
                tab === "friends" && <UserFriend />
            }
            {
                tab === "feedback" && <UserFeedback />
            }
            {
                tab === "games" && <UserGame />
            }
            {
                tab === "settings" && <UserSettings />
            }
            {
                tab === "password-reset" && <UserPWReset />
            }
        </div>
    )
}

export default User
