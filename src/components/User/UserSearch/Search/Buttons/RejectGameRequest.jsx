import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../../../../socket/socket';
import updateShowNotification from '../../../../../redux/Auth/Actions/showNotification';

const RejectGameRequest = () => {

    const dispatch = useDispatch();

    const notification = useSelector(state => state.Auth.notification);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const handleRejectGameRequest = () => {
        socket.emit("game-request-rejected", { room: notification.data.gameId, id: userDetails.id, username: userDetails.username, profile_photo: userDetails.profile_photo});
        dispatch(updateShowNotification({ show: false, type: '', data: {} }))
    }

    return (
        <button
            type="button"
            onClick={handleRejectGameRequest}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <span>Deny</span>
            <i className="fa-solid fa-rectangle-xmark ml-2"></i>
        </button>
    )
}

export default RejectGameRequest
