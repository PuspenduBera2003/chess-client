import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import socket from '../../../../../socket/socket';
import updateShowBotomToast from '../../../../../redux/Auth/Actions/showBottomToast';
import handleGenerateLink from '../../../../../api/handleGenerateLink';
import updateGameLink from '../../../../../redux/MultiPlayer/Actions/updateGameLink';
import updateRequestSender from '../../../../../redux/MultiPlayer/Actions/updateRequestSender';

const PlayMatch = (props) => {

    const { oid } = props;

    const navigate = useNavigate();

    const userDetails = useSelector(state => state.Auth.userDetails);

    const dispatch = useDispatch();

    const selectedPiece = 'white'

    const handlePlayMatch = async () => {
        const response = await handleGenerateLink();
        if (!response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: response.error }));
            return;
        }
        dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Request Send Successfully' }));
        const gameLink = `/game/play-with-friends/${response.id}`;
        navigate(gameLink);
        dispatch(updateGameLink(`/game/play-with-friends/${response.id}`));
        socket.emit("game-created", { room: response.uniqueId, userSelection: selectedPiece });
        socket.emit("play-with-friend", { room: response.uniqueId, userSelection: selectedPiece, rid: oid, sid: userDetails.id, susername: userDetails.username, sprofile_photo: userDetails.profile_photo, gameLink });
        dispatch(updateRequestSender(true));
    }

    return (
        <button
            type="button"
            onClick={handlePlayMatch}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Play a Match
            <i className="fa-solid fa-chess w-3.5 h-3.5 ms-2"></i>
        </button>
    )
}

export default PlayMatch
