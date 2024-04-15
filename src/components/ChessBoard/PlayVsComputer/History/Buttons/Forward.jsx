import React from 'react'
import Chess from 'chess.js'
import { useSelector, useDispatch } from 'react-redux'
import updateGame from '../../../../../redux/Bot/Actions/updateGame';
import updateBotAnalyzer from '../../../../../redux/Bot/Actions/updateBotAnalyzer';
import updateBotResultOpen from '../../../../../redux/Bot/Actions/updateBotResultOpen';


const Forward = () => {

    const botHistory = useSelector(state => state.Bot.botHistory);

    const game = useSelector(state => state.Bot.game);

    const dispatch = useDispatch();

    const handleForward = () => {
        const currentIndex = botHistory.findIndex(item => item.position === game.fen());
        if (currentIndex < (botHistory.length - 1)) {
            const previousPosition = botHistory[currentIndex + 1].position;
            dispatch(updateGame(new Chess(previousPosition)));
            const newArray = botHistory.slice(0, currentIndex + 2);
            dispatch(updateBotAnalyzer(newArray));
            dispatch(updateBotResultOpen(false))
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
