import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Chess from 'chess.js'
import updateGame from '../../../../../redux/Bot/Actions/updateGame';
import updateBotAnalyzer from '../../../../../redux/Bot/Actions/updateBotAnalyzer';

const Current = () => {

    const dispatch = useDispatch();

    const boardPosition = useSelector(state => state.Bot.position);

    const gameHistory = useSelector(state => state.Bot.botHistory);

    const handleViewCurrent = () => {
        dispatch(updateGame(new Chess(boardPosition)));
        dispatch(updateBotAnalyzer(gameHistory));
    }

    return (
        <button
            onClick={handleViewCurrent}
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <i className="fa-solid fa-rotate-right"></i>
        </button>
    )
}

export default Current
