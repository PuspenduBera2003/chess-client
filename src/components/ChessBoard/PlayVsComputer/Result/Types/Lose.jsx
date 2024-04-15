import React from 'react'
import { useSelector } from 'react-redux'

const Lose = () => {

  const gameHistory = useSelector(state => state.Bot.botHistory);

  return (
    <div className='flex flex-col flex-wrap gap-3 items-center justify-center rounded-lg p-4 min-h-32 min-w-32'>
      <i className="fa-solid fa-chess" style={{ fontSize: '3rem', color: 'white' }}></i>
      <div className={`uppercase text-xl font-bold text-center text-white`}>
        You Lose
      </div>
      <span className={`uppercase text-sm font-semibold text-white`}>
        Number of moves: {gameHistory.length}
      </span>
    </div>
  )
}

export default Lose
