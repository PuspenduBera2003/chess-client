import React from 'react'
import Chess from 'chess.js'
import { useSelector, useDispatch } from 'react-redux'
import updateGame from '../../../../../redux/MultiPlayer/Actions/updateGame';
import updateGameAnalyzer from '../../../../../redux/MultiPlayer/Actions/updateGameAnalyzer';
import updateResultModalOpen from '../../../../../redux/MultiPlayer/Actions/updateModalOpen';

const Forward = () => {

    const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);

    const game = useSelector(state => state.MultiPlayer.game);

    const dispatch = useDispatch();

    const handleForward = () => {
        const currentIndex = gameHistory.findIndex(item => item.position === game.fen());
        if (currentIndex < (gameHistory.length - 1)) {
            const previousPosition = gameHistory[currentIndex + 1].position;
            dispatch(updateGame(new Chess(previousPosition)));
            const newArray = gameHistory.slice(0, currentIndex + 2);
            dispatch(updateGameAnalyzer(newArray));
            dispatch(updateResultModalOpen(false))
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
