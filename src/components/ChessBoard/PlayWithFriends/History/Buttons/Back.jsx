import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Chess from 'chess.js';
import updateGameAnalyzer from '../../../../../redux/MultiPlayer/Actions/updateGameAnalyzer';
import updateGame from '../../../../../redux/MultiPlayer/Actions/updateGame';
import updateResultModalOpen from '../../../../../redux/MultiPlayer/Actions/updateModalOpen';

const Back = () => {

    const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);

    const game = useSelector(state => state.MultiPlayer.game);

    const dispatch = useDispatch();

    const handleBack = () => {
        const currentIndex = gameHistory.findIndex(item => item.position === game.fen());

        if (currentIndex > 0) {
            const previousPosition = gameHistory[currentIndex - 1].position;
            dispatch(updateGame(new Chess(previousPosition)));
            const newArray = gameHistory.slice(0, currentIndex);
            dispatch(updateGameAnalyzer(newArray));
            dispatch(updateResultModalOpen(false))
        }
    }

    return (
        <button onClick={handleBack} type="button" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
            <i className="fa-solid fa-left-long"></i>
        </button>
    )
}

export default Back
