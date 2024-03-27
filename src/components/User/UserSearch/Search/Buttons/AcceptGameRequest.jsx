import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import socket from '../../../../../socket/socket';
import updateShowNotification from '../../../../../redux/Auth/Actions/showNotification';
import updateShowBotomToast from '../../../../../redux/Auth/Actions/showBottomToast';

const AcceptGameRequest = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const notification = useSelector(state => state.Auth.notification);

    const handleAcceptGameRequest = () => {
        navigate(notification.data.gameLink);
        socket.emit("game-request-accepted", { room: notification.data.gameId, gameLink: notification.data.gameLink });
        dispatch(updateShowNotification({ show: false, type: '', data: {} }))
        dispatch(updateShowBotomToast({ show: true, type: 'success', message: "Match Started" }));
    }

    return (
        <button
            onClick={handleAcceptGameRequest}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <span>Play</span>
            <i className="fa-solid fa-check-to-slot ml-2"></i>
        </button>
    )
}

export default AcceptGameRequest
