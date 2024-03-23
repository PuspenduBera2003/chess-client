import React, { useState } from 'react';
import './SearchResult.css'
import { useSelector } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import Unfriend from './Buttons/Unfriend';
import UnsendReq from './Buttons/UnsendReq';
import AddFriend from './Buttons/AddFriend';
import ViewProfile from './Buttons/ViewProfile';
import ViewOwnProfile from './Buttons/ViewOwnProfile';
import Accept from './Buttons/Accept';
import Reject from './Buttons/Reject';

const SearchResult = (props) => {

    const { searchResult } = props;

    const [imageError, setImageError] = useState(false);

    const userDetails = useSelector(state => state.Auth.userDetails)

    const theme = useSelector(state => state.Theme.currentTheme)

    const friends = useSelector(state => state.Auth.userFriend);

    const cardStyle = (theme === 'dark')
        ? 'bg-gray-800'
        : 'bg-violet-50'

    const animationProps = useSpring({
        from: { transform: 'translateY(30px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: { tension: 300, friction: 10 },
    });

    return (
        <animated.div
            style={animationProps}
            className={`${cardStyle} border border-gray-200 rounded-lg shadow dark:border-gray-600 friend-card px-2 mx-3`}>
            {(userDetails.id === searchResult.id) &&
                <span className="bg-gray-200 text-gray-800 text-sm font-medium dark:bg-gray-700 dark:text-gray-300 px-2.5 pb-1 pt-0.5 rounded  absolute border border-gray-600 dark:border-gray-600" style={{ top: -10, left: -20 }}>
                    Me
                </span>}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-5">
                {
                    (!imageError && searchResult.profile_photo) &&
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={searchResult.profile_photo}
                        alt={searchResult.username}
                        onError={() => setImageError(true)}
                    />
                }
                {
                    (imageError || !searchResult.profile_photo) &&
                    <div className="flex items-center">
                        <svg className="w-24 h-24 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                    </div>
                }
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {searchResult.username}
                </h5>
                {
                    (userDetails.id === searchResult.id) ?
                        <ViewOwnProfile />
                        :
                        <div className="flex flex-wrap items-center justify-center gap-3">
                            {
                                (friends[searchResult.id] === 'f') ?
                                    <Unfriend rid={searchResult.id} />
                                    :
                                    (friends[searchResult.id] === 'q')
                                        ?
                                        <UnsendReq rid={searchResult.id} />
                                        :
                                        (friends[searchResult.id] === 'p')
                                            ?
                                            <div className='flex flex-wrap gap-3 justify-center items-center'>
                                                <Accept rid={searchResult.id} />
                                                <Reject rid={searchResult.id} />
                                            </div>
                                            :
                                            <AddFriend rid={searchResult.id} />
                            }
                            <ViewProfile />
                        </div>
                }
            </div>
        </animated.div>

    );
}

export default SearchResult;
