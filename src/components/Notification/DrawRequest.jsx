import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import socket from '../../socket/socket';
import updateShowNotification from '../../redux/Auth/Actions/showNotification';

const DrawRequest = () => {
    const dispatch = useDispatch();

    const notification = useSelector(state => state.Auth.notification);

    const handleAcceptRequest = () => {
        socket.emit("draw-request-accepted", { room: notification.data.room });
        dispatch(updateShowNotification({ show: false, type: '', data: {} }))
    }

    const handleRejectRequest = () => {
        socket.emit("draw-request-rejected", { room: notification.data.room });
        dispatch(updateShowNotification({ show: false, type: '', data: {} }));
    }

    return (
        <div className="flex border border-gray-600 dark:border-gray-500 flex-wrap flex-col gap-1 items-center w-full max-w-xs p-1 text-gray-700 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-2 right-2 z-40" role="alert">
            <div className='flex flex-row flex-wrap gap-2 items-center justify-center'>
                <i className="fa-solid fa-handshake" style={{ fontSize: '2rem' }}></i>
                <div className='flex flex-col flex-wrap gap-1 justify-center'>
                    <div className="ms-3 font-bold text-md block text-gray-800 dark:text-gray-200">
                        Draw Request
                    </div>
                    <div className="ms-3 text-sm font-normal block">
                        <span className='uppercase font-semibold'>{notification.data.sender}</span> Send Draw Request
                    </div>
                </div>
            </div>
            <div className='flex flex-row flex-wrap gap-2 mt-2'>
                <button
                    onClick={handleAcceptRequest}
                    type="button"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Accept
                </button>
                <button onClick={handleRejectRequest} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    Reject
                </button>
            </div>
        </div>
    )
}

export default DrawRequest
