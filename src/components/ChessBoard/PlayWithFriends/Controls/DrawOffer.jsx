import React, { useEffect } from 'react'
import socket from '../../../../socket/socket'
import { useSelector, useDispatch } from 'react-redux'
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';

const DrawOffer = () => {

    const gameId = useSelector(state => state.MultiPlayer.gameId);

    const dispatch = useDispatch();

    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const currentPosition = useSelector(state => state.MultiPlayer.position);

    const result = useSelector(state => state.MultiPlayer.gameResult)

    const handleSendDrawOffer = () => {
        if(currentPosition === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
            dispatch(updateShowBotomToast({show: true, type: 'failure', message: 'Cannot send'}))
        }
        let user;
        if (userDetails) {
            user = userDetails.username;
        } else {
            user = boardOrientation;
        }
        socket.emit("draw-request-send", { room: gameId, sender: user });
        dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Draw Request Send' }))
    }

    return (
        <button onClick={handleSendDrawOffer} className="relative w-full h-full inline-flex items-center justify-center overflow-hidden text-sm font-medium  group">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-700 dark:text-gray-100 rounded-md group-hover:bg-opacity-0">
                Draw Offer
                <i className="ml-2 fa-solid fa-handshake"></i>
            </span>
        </button>
    )
}

export default DrawOffer
