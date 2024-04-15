import React from 'react'
import { useSelector } from 'react-redux'

const Draw = () => {

    const result = useSelector(state => state.Bot.result)
    const gameHistory = useSelector(state => state.Bot.botHistory);

    return (
        <div className='flex flex-col flex-wrap gap-3 items-center justify-center rounded-lg p-4 min-h-32 min-w-32'>
            <i className="fa-solid fa-handshake-angle" style={{ fontSize: '4rem', color: 'white' }}></i>
            {
                (result === "SD") ? (
                        <div className={`uppercase text-xl font-bold text-center text-white`}>
                            Game Drawn By Stalemate
                        </div>
                    ) : (
                        <div className={`uppercase text-xl font-bold text-center text-white`}>
                            Game Drawn
                        </div>
                    )
            }
            <span className={`uppercase text-sm font-semibold text-white}`}>
                Number of moves: {gameHistory.length}
            </span>
        </div>
    )
}

export default Draw
