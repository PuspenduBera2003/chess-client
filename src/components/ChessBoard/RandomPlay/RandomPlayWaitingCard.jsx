import React, { useEffect, useState } from 'react'
import socket from '../../../socket/socket'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sadEmoji from '../../../static/images/sad_emoji.webp'
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import updateGameLink from '../../../redux/MultiPlayer/Actions/updateGameLink';

const renderTime = ({ remainingTime, theme }) => {

    if (remainingTime === 0) {
        return <div className="timer">
            <img src={sadEmoji} alt="Time Out" />
        </div>;
    }

    return (
        <div className="timer flex animate-spin items-center justify-center">
            <i className={`fa-solid fa-chess-pawn ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontSize: '3.8rem' }}></i>
        </div>
    );
};

const RandomPlayWaitingCard = (props) => {

    const navigate = useNavigate();

    const { setRequestSend } = props;

    const dispatch = useDispatch();

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const [timeOver, setTimeOver] = useState(false);
    const [key, setKey] = React.useState(0);

    const handleCancelRequest = () => {
        socket.emit("cancel-random-play-request");
        setRequestSend(false);
        dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Successfully Cancelled Request' }))
    }

    const handleComplete = () => {
        socket.emit("cancel-random-play-request");
        setTimeOver(true);
        dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'No Player Available Right Now' }))
    }

    const handlePlayRequest = () => {
        setKey((prevKey) => prevKey + 1);
        socket.emit("random-play")
        setRequestSend(true);
        setTimeOver(false)
    }

    const handleBackClick = () => {
        setRequestSend(false);
    }

    useEffect(() => {
        socket.on("random-game-id", (data) => {
            dispatch(updateGameLink(`/game/random-game/${data.gameId}`))
            socket.emit("game-created", { room: data.gameId, userSelection: data.userSelection })
            navigate(`/game/random-game/${data.gameId}`);
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Game Started' }))
        })
    })

    return (
        <div className='w-72 flex rounded-lg flex-col items-center p-5 gap-3 justify-center bg-indigo-50 border dark:border-gray-600 dark:bg-gray-800'>
            <CountdownCircleTimer
                key={key}
                isPlaying
                duration={120}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[120, 60, 30, 0]}
                onComplete={handleComplete}
                size={92}
                strokeWidth={5}
            >
                {(props) => renderTime({ ...props, theme: currentTheme })}
            </CountdownCircleTimer>
            <div className='flex flex-col items-center justify-center gap-3'>
                {
                    !timeOver ?
                        <span className='text-black dark:text-white'>
                            Searching for player...
                        </span>
                        :
                        <span className='text-black dark:text-white font-semibold text-sm' style={{ textTransform: 'uppercase' }}>
                            No player available right now
                        </span>
                }
                {
                    !timeOver ?
                        (
                            <button
                                type="button"
                                onClick={handleCancelRequest}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                Cancel
                                <i className="fa-solid fa-xmark ml-2"></i>
                            </button>
                        )
                        :
                        (
                            <div className='flex flex-row flex-wrap gap-1 items-center justify-center'>
                                <button
                                    onClick={handleBackClick}
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    <i className="fa-solid fa-arrow-left me-3"></i>
                                    Back
                                </button>
                                <button
                                    onClick={handlePlayRequest}
                                    type="button"
                                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    Retry
                                    <i className="fa-solid fa-rotate ml-2"></i>
                                </button>
                            </div>
                        )}
            </div>
        </div>
    )
}

export default RandomPlayWaitingCard