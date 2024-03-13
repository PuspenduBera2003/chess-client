import React, { useState } from 'react';
import './SearchResult.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';

const SearchResult = (props) => {

    const { searchResult } = props;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [imageError, setImageError] = useState(false);

    const userDetails = useSelector(state => state.Auth.userDetails)

    const onAddingFriend = () => {
        dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Friend Request Sent' }))
    }

    const handleViewProfile = () => {
        navigate('/user/dashboard/profile')
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 friend-card px-2">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 py-5">
                {
                    !imageError &&
                    <img
                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                        src={searchResult.profile_photo}
                        alt="User"
                        onError={() => setImageError(true)}
                    />
                }
                {
                    imageError &&
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
                        <button 
                        onClick={handleViewProfile}
                        type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            View Profile
                        </button>
                        :
                        <div className="flex gap-3">
                            <button
                                onClick={onAddingFriend}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Add friend
                            </button>
                            <button className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Message
                            </button>
                        </div>
                }
            </div>
        </div>

    );
}

export default SearchResult;
