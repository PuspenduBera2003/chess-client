import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Chess from 'chess.js';
import updateHistoryGame from '../../../../../redux/Auth/Actions/updateHistoryGame';
import updateHistoryAnalyzer from '../../../../../redux/Auth/Actions/setHistoryAnalyzer';


const Back = () => {

    const moveHistory = useSelector(state => state.Auth.moveHistory);

    const game = useSelector(state => state.Auth.historyGame);

    const dispatch = useDispatch();

    const handleBack = () => {
        const currentIndex = moveHistory.findIndex(item => item.position === game.fen());

        if (currentIndex > 0) {
            const previousPosition = moveHistory[currentIndex - 1].position;
            dispatch(updateHistoryGame(new Chess(previousPosition)));
            const newArray = moveHistory.slice(0, currentIndex);
            dispatch(updateHistoryAnalyzer(newArray));
        }
    }

    return (
        <button onClick={handleBack} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <i className="fa-solid fa-left-long"></i>
        </button>
    )
}

export default Back
