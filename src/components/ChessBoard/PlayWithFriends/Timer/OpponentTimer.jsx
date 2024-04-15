import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useSelector } from 'react-redux';
import socket from "../../../../socket/socket";

export default function OpponentTimer() {

    const time = 1800;

    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);
    const theme = useSelector(state => state.Theme.currentTheme);
    const player = (boardOrientation === 'black') ? 'b' : 'w';
    const game = useSelector(state => state.MultiPlayer.game);
    const gameId = useSelector(state => state.MultiPlayer.gameId);
    const result = useSelector(state => state.MultiPlayer.gameResult)

    const [turn, setTurn] = useState(false)

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
            setTurn(data.turn !== player)
        })
    })

    useEffect(() => {
        const firstMoveChecker = (boardOrientation === 'black') ? 'b' : 'w';
        if (game.turn() !== firstMoveChecker) {
            setTurn(true);
        } else {
            setTurn(false)
        }
    }, [boardOrientation])

    return (
        <div className="font-semibold text-gray-900 dark:text-gray-200">
            <CountdownCircleTimer
                colors={theme === 'dark' ? '#e6e7e8' : '#1c1c1c'}
                duration={time}
                strokeWidth={0}
                size={55}
                isPlaying={turn && !result.has(gameId)}
            >
                {({ remainingTime }) => renderTime(remainingTime)}
            </CountdownCircleTimer>
        </div>
    );
}
