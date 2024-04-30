import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const NotConcluded = (props) => {

    const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);
    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);

    const [pieceColor, setPieceColor] = useState('white');

    useEffect(() => {
        setPieceColor(boardOrientation)
    }, [boardOrientation])

    return (
        <div className='flex flex-col flex-wrap gap-3 items-center justify-center rounded-lg p-4 min-h-32 min-w-32'>
            <i className="fa-solid fa-link-slash" style={{ fontSize: '4rem', color: pieceColor }}></i>
            <div className={`uppercase text-xl font-bold text-center ${boardOrientation === 'white' ? 'text-white' : 'text-gray-900'}`}>
                Game Not Concluded
            </div>
            <span className={`uppercase text-sm font-semibold ${boardOrientation === 'white' ? 'text-white' : 'text-gray-900'}`}>
                Number of moves: {gameHistory.length}
            </span>
        </div>
    )
}

export default NotConcluded