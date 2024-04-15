import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useDispatch, useSelector } from 'react-redux';
import socket from "../../../../socket/socket";
import updatePlayingGame from "../../../../redux/MultiPlayer/Actions/updatePlayingGame";
import updateResult from "../../../../redux/MultiPlayer/Actions/updateGameResult";
import updateShowBotomToast from "../../../../redux/Auth/Actions/showBottomToast";

export default function SelfTimer() {

    const time = 1800;
    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);
    const theme = useSelector(state => state.Theme.currentTheme);
    const game = useSelector(state => state.MultiPlayer.game);
    const player = (boardOrientation === 'black') ? 'b' : 'w';
    const gameId = useSelector(state => state.MultiPlayer.gameId);
    const result = useSelector(state => state.MultiPlayer.gameResult);
    const userDetails = useSelector(state => state.Auth.userDetails);
    const [turn, setTurn] = useState(false);
    const dispatch = useDispatch();

    const renderTime = (remainingTime) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        return (
            <div className="bg-gray-200 dark:bg-gray-800 p-1 rounded-md border dark:border-gray-600 text-sm">
                {formattedMinutes} : {formattedSeconds}
            </div>
        )
    }

    useEffect(() => {
        socket.on("board", (data) => {
            setTurn(data.turn === player)
        })
    })

    useEffect(() => {
        const firstMoveChecker = (boardOrientation === 'black') ? 'b' : 'w';
        if (game.turn() === firstMoveChecker) {
            setTurn(true);
        } else {
            setTurn(false)
        }
    }, [boardOrientation])

    const handleComplete = () => {
        let user;
        if (userDetails) {
            user = userDetails.username;
        } else {
            user = boardOrientation;
        }
        socket.emit("time-out", {room: gameId, sender: user });
        dispatch(updateResult({ key: gameId, value: 'T' }));
        dispatch(updatePlayingGame(false));
        dispatch(updateShowBotomToast({show: true, type: 'failure', message: 'Your Time Out'}))
    }

    return (
        <div className="font-semibold text-gray-900 dark:text-gray-200">
            <CountdownCircleTimer
                colors={theme === 'dark' ? '#e6e7e8' : '#1c1c1c'}
                duration={time}
                strokeWidth={0}
                size={55}
                onComplete={handleComplete}
                isPlaying={turn && !result.has(gameId)}
            >
                {({ remainingTime }) => renderTime(remainingTime)}
            </CountdownCircleTimer>
        </div>
    );
}
