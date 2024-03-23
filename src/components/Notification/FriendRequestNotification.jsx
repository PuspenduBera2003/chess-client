import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import updateShowNotification from '../../redux/Auth/Actions/showNotification';
import Accept from '../User/UserSearch/Search/Buttons/Accept';
import Reject from '../User/UserSearch/Search/Buttons/Reject';

const FriendRequestNotification = () => {

    const dispatch = useDispatch();

    const notification = useSelector(state => state.Auth.notification);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const frontEndHost = process.env.REACT_APP_HOST_CLIENT;

    const handleDismiss = () => {
        dispatch(updateShowNotification({ show: false, type: '', data: {} }))
    }

    useEffect(() => {
        const text = `Hey ${userDetails.username}! ${notification.data.username} send you friend request`;
        if (Notification.permission === "granted") {
            const requestReceived = new Notification("ChessHub Friend Request Received", { body: text });
            requestReceived.onclick = function () {
                window.open(frontEndHost, "_blank");
                requestReceived.close();
            };
        }
    }, [])

    return (
        <div className="flex border border-gray-600 dark:border-gray-500 flex-wrap flex-col gap-1 items-center w-full max-w-xs p-4 text-gray-700 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-2 right-2 z-40" role="alert">
            <div className='flex flex-row flex-wrap gap-2 items-center justify-center'>
                {
                    notification.data.profile_photo ?
                        <img src={notification.data.profile_photo} alt={notification.data.username} className='rounded-full w-16 h-16' />
                        :
                        <div className="flex items-center">
                            <svg className="w-16 h-16 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </div>
                }
                <div className='flex flex-col flex-wrap gap-1 justify-center'>
                    <div className="ms-3 font-bold text-md block text-gray-800 dark:text-gray-200">
                        Friend Request
                    </div>
                    <div className="ms-3 text-sm font-normal block">
                        {notification.data.username}
                    </div>
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-2 mt-2'>
                <Accept rid={notification.data.sid} />
                <Reject rid={notification.data.sid} />
                <button
                    type="button"
                    onClick={handleDismiss}
                    className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-900 dark:border-blue-600 dark:text-blue-200 dark:hover:text-white dark:focus:ring-blue-800"
                    aria-label="Close">
                    Dismiss
                </button>
            </div>
        </div>
    )
}

export default FriendRequestNotification
