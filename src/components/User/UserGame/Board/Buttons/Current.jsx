import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Chess from 'chess.js'
import updateHistoryGame from '../../../../../redux/Auth/Actions/updateHistoryGame';
import updateHistoryAnalyzer from '../../../../../redux/Auth/Actions/setHistoryAnalyzer';

const Current = () => {

    const dispatch = useDispatch();

    const moveHistory = useSelector(state => state.Auth.moveHistory);

    const boardPosition = moveHistory[moveHistory.length - 1].position;

    const handleViewCurrent = () => {
        dispatch(updateHistoryGame(new Chess(boardPosition)));
        dispatch(updateHistoryAnalyzer(moveHistory));
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
