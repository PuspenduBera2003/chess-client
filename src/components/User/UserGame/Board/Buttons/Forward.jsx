import React from 'react'
import Chess from 'chess.js'
import { useSelector, useDispatch } from 'react-redux'
import updateHistoryGame from '../../../../../redux/Auth/Actions/updateHistoryGame';
import updateHistoryAnalyzer from '../../../../../redux/Auth/Actions/setHistoryAnalyzer';


const Forward = () => {

    const moveHistory = useSelector(state => state.Auth.moveHistory);

    const game = useSelector(state => state.Auth.historyGame);

    const dispatch = useDispatch();

    const handleForward = () => {
        const currentIndex = moveHistory.findIndex(item => item.position === game.fen());
        if (currentIndex < (moveHistory.length - 1)) {
            const previousPosition = moveHistory[currentIndex + 1].position;
            dispatch(updateHistoryGame(new Chess(previousPosition)));
            const newArray = moveHistory.slice(0, currentIndex + 2);
            dispatch(updateHistoryAnalyzer(newArray));
        }
    }

    return (
        <button
            onClick={handleForward}
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <i className="fa-solid fa-right-long"></i>
        </button>
    )
}

export default Forward
