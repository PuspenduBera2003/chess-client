import React from 'react'
import { useSelector } from 'react-redux'
import AcceptGameRequest from '../User/UserSearch/Search/Buttons/AcceptGameRequest';
import RejectGameRequest from '../User/UserSearch/Search/Buttons/RejectGameRequest';

const NewGameRequest = () => {

    const notification = useSelector(state => state.Auth.notification);

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
                <i className="fa-solid fa-chess ml-2" style={{ fontSize: 30 }}></i>
                <div className='flex flex-col flex-wrap gap-1 justify-center'>
                    <div className="ms-3 font-bold text-md block text-gray-800 dark:text-gray-200">
                        Game Request
                    </div>
                    <div className="ms-3 text-sm font-normal block">
                        {notification.data.username}
                    </div>
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-2 mt-2'>
                <AcceptGameRequest />
                <RejectGameRequest />
            </div>
        </div>
    )
}

export default NewGameRequest
