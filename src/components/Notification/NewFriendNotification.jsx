import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import updateShowNotification from '../../redux/Auth/Actions/showNotification';

const NewFriendNotification = () => {

    const dispatch = useDispatch();

    const notification = useSelector(state => state.Auth.notification);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const frontEndHost = process.env.REACT_APP_HOST_CLIENT;

    const handleDismiss = () => {
        dispatch(updateShowNotification({ show: false, type: '', data: {} }))
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(updateShowNotification({ show: false, type: '', data: {} }));
        }, 5000);
        return () => clearTimeout(timeoutId);
    });

    useEffect(() => {
        const text = `Hey ${userDetails.username}! ${notification.data.username} accepted your friend request`;
        if (Notification.permission === "granted") {
            const requestAccepted = new Notification("ChessHub Friend Request Accepted", { body: text });
            requestAccepted.onclick = function () {
                window.open(frontEndHost, "_blank");
                requestAccepted.close();
            };
        }
    }, [])

    return (
        <div className="flex border border-gray-600 dark:border-gray-500 flex-wrap flex-row gap-1 items-center w-full max-w-sm p-4 text-gray-700 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-2 right-2 z-40" role="alert">
            <div className='flex flex-row flex-wrap gap-2 items-center justify-center'>
                {
                    notification.data.profile_photo ?
                        <img src={notification.data.profile_photo} alt={notification.data.username} className='rounded-full w-12 h-12' />
                        :
                        <div className="flex items-center">
                            <svg className="w-12 h-12 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </div>
                }
                <div className='flex flex-col flex-wrap gap-1 justify-center'>
                    <div className="ms-3 font-bold text-md block text-gray-800 dark:text-gray-200">
                        Friend Update
                    </div>
                    <div className="ms-3 text-sm font-normal block">
                        {notification.data.username} accepted your friend request
                    </div>
                </div>
            </div>
            <button
                onClick={handleDismiss}
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-gray-50 text-gray-500 rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-gray-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white" aria-label="Close">
                <span className="sr-only">Dismiss</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    )
}

export default NewFriendNotification
