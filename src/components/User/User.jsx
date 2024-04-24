import React from 'react';
import UserNav from './UserNavigation/UserNav';
import MobileUserNav from './UserNavigation/MobileUserNav';
import UserHome from './UserHome/UserHome';
import { useParams } from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile';
import UserSearch from './UserSearch/UserSearch';
import UserFriend from './UserFriend/UserFriend';
import UserFeedback from './UserFeedback/UserFeedback';
import UserGame from './UserGame/UserGame';
import UserSettings from './UserSettings/UserSettings';
import UserPWReset from './UserPWReset/UserPWReset';
import UserFAQ from './UserFAQ/UserFAQ';

const User = () => {
    const { tab } = useParams();

    // Map of available tabs and their corresponding components
    const tabComponents = {
        '': <UserHome />, // Render UserHome by default when tab is empty
        home: <UserHome />,
        profile: <UserProfile />,
        search: <UserSearch />,
        friends: <UserFriend />,
        feedback: <UserFeedback />,
        games: <UserGame />,
        all: <UserSettings />,
        'password-reset': <UserPWReset />,
        'frequently-asked-questions': <UserFAQ />,
    };

    // Render the corresponding component if tab is valid, else render NotFound
    const isValidTab = Object.keys(tabComponents).includes(tab);

    return (
        <div className='overflow-hidden'>
            <div className='hidden md:block'>
                <UserNav active={tab} />
            </div>
            <div className='block md:hidden'>
                <MobileUserNav />
            </div>
            {/* Render the corresponding component if tab is valid, else render UserHome */}
            {isValidTab ? tabComponents[tab] : <UserHome />}
        </div>
    );
};

export default User;
