import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Win = () => {

    const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);
    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);
    const result = useSelector(state => state.MultiPlayer.gameResult);
    const gameId = useSelector(state => state.MultiPlayer.gameId);

    const [pieceColor, setPieceColor] = useState('white');

    useEffect(() => {
        setPieceColor(boardOrientation)
    }, [boardOrientation])

    return (
        <div className='flex flex-col flex-wrap gap-3 items-center justify-center rounded-lg p-4 min-h-32 min-w-32'>
            <i className="fa-solid fa-chess" style={{ fontSize: '3rem', color: pieceColor }}></i>
            {
                (result.get(gameId) === 'W') ?
                    <div className={`uppercase text-xl font-bold text-center ${boardOrientation === 'white' ? 'text-white' : 'text-gray-900'}`}>
                        You Win By Checkmate
                    </div>
                    : (result.get(gameId) === 'OT') ?
                    <div className={`uppercase text-xl font-bold text-center ${boardOrientation === 'white' ? 'text-white' : 'text-gray-900'}`}>
                        You Win, Opponent's Time Out
                    </div>
                    :
                    <div className={`uppercase text-xl font-bold text-center ${boardOrientation === 'white' ? 'text-white' : 'text-gray-900'}`}>
                        You Win, Opponent Resigned
                    </div>
            }
            <span className={`uppercase text-sm font-semibold ${boardOrientation === 'white' ? 'text-white' : 'text-gray-900'}`}>
                Number of moves: {gameHistory.length}
            </span>
        </div>
    )
}

export default Win
