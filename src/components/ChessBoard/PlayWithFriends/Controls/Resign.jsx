import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from '../../../../socket/socket';
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';
import { useNavigate } from 'react-router-dom';
import updateResult from '../../../../redux/MultiPlayer/Actions/updateGameResult';
import updatePlayingGame from '../../../../redux/MultiPlayer/Actions/updatePlayingGame';

const Resign = () => {

    const atBeginning = useSelector(state => state.MultiPlayer.atBeginning);
    const gameId = useSelector(state => state.MultiPlayer.gameId);
    const userDetails = useSelector(state => state.Auth.userDetails);
    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        let user;
        if (userDetails) {
            user = userDetails.username;
        } else {
            user = boardOrientation;
        }
        socket.emit("cancel-game", { room: gameId, sender: user });
        dispatch(updatePlayingGame(false));
        dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Game Cancelled!' }));
        navigate('/game/play-with-friends');
    }

    const handleResign = () => {
        let user;
        if (userDetails) {
            user = userDetails.username;
        } else {
            user = boardOrientation;
        }
        dispatch(updateResult({ key: gameId, value: 'R' }));
        dispatch(updatePlayingGame(false));
        socket.emit("resigned", { room: gameId, sender: user });
        dispatch(updateShowBotomToast({show: true, type: 'success', message: 'You Resigned From Game'}))
    }

    return (
        <>
            {
                atBeginning ?
                    (
                        <button
                            onClick={handleCancel}
                            className="w-full h-full relative inline-flex items-center justify-center overflow-hidden text-sm font-medium group">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-700 dark:text-gray-100 rounded-md group-hover:bg-opacity-0">
                                Cancel
                                <i className="ml-2 fa-solid fa-rectangle-xmark"></i>
                            </span>
                        </button>
                    ) : (
                        <button
                            onClick={handleResign}
                            className="w-full h-full relative inline-flex items-center justify-center overflow-hidden text-sm font-medium group">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-700 dark:text-gray-100 rounded-md group-hover:bg-opacity-0">
                                Resign
                                <i className="ml-2 fa-solid fa-arrow-right-from-bracket"></i>
                            </span>
                        </button>
                    )
            }
        </>
    )
}

export default Resign
