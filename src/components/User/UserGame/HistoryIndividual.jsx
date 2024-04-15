import React, { useEffect, useState } from 'react'
import drawImg from '../../../static/images/chess-draw.png'
import winImg from '../../../static/images/chess-win.png'
import loseImg from '../../../static/images/chess-lost.png'
import { useDispatch, useSelector } from 'react-redux';
import updateShowHistoryBoard from '../../../redux/Auth/Actions/showHistoryBoard';
import updateMoveHistory from '../../../redux/Auth/Actions/updateMoveHistory';
import updateHistoryGame from '../../../redux/Auth/Actions/updateHistoryGame';
import Chess from 'chess.js';
import updateHistoryBoardOrientation from '../../../redux/Auth/Actions/setHistoryBoardOrientation';
import updateOpponentDetails from '../../../redux/Auth/Actions/updateOpponentDetails';
import updateHistoryAnalyzer from '../../../redux/Auth/Actions/setHistoryAnalyzer';
import updateConclusion from '../../../redux/Auth/Actions/updateConclusion';
import dateFormatter from '../../../utils/dateFormatter';

const HistoryIndividual = (props) => {
    const { game } = props;
    const [result, setResult] = useState('');
    const userDetails = useSelector(state => state.Auth.userDetails);
    const dispatch = useDispatch();
    const theme = useSelector(state => state.Theme.currentTheme);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const cardColor = (theme === 'dark') ? 'bg-zinc-900' : 'bg-gray-50';

    useEffect(() => {
        const conclusion = game.conclusion;
        const firstSpaceIndex = conclusion.indexOf(" ");
        const firstWord = firstSpaceIndex !== -1 ? conclusion.substring(0, firstSpaceIndex) : conclusion;
        if ((firstWord === 'white' && game.white_id === userDetails.id) || (firstWord === 'black' && game.white_id !== userDetails.id)) {
            setResult('W');
        } else if (firstWord === 'game' || firstWord === 'Game') {
            setResult('D');
        } else {
            setResult('L');
        }
    }, [game.conclusion, game.white_id, userDetails]);

    const handleClick = () => {
        dispatch(updateConclusion(game.conclusion));
        dispatch(updateShowHistoryBoard(true));
        dispatch(updateMoveHistory(game.moves));
        dispatch(updateHistoryAnalyzer(game.moves))
        dispatch(updateHistoryGame(new Chess(game.moves[game.moves.length - 1].position)))
        dispatch(updateOpponentDetails({ opponent_name: game.opponent_name, opponent_photo: game.opponent_photo }))
        if ((game.white_id === userDetails.id)) {
            dispatch(updateHistoryBoardOrientation('white'))
        } else {
            dispatch(updateHistoryBoardOrientation('black'))
        }
    }

    useEffect(() => {
        const formatted = dateFormatter(game.date);
        setDate(formatted.date);
        setTime(formatted.time)
    }, [game])

    return (
        <div className={`flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-between w-full m-2 border dark:border-gray-500 gap-3 rounded-lg shadow-md ${cardColor}`}>
            {
                game.opponent_photo ?
                    <img className='w-24 h-24 rounded-l-lg' src={game.opponent_photo} alt={game.opponent_name} />
                    :
                    <div className="flex items-center">
                        <svg className="w-24 h-24 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg>
                    </div>
            }
            <div className='flex flex-col gap-2 text-center'>
                <span className='text-gray-900 dark:text-gray-200'>{time && time}</span>
                <span className='text-gray-900 dark:text-gray-200'>{date && date}</span>
            </div>
            <span className='text-gray-900 dark:text-gray-200 font-semibold'>{game.opponent_name}</span>
            {
                (result === 'W') ? (
                    <img className='w-16 h-16' src={winImg} alt={result} />
                ) : (result === 'L') ? (
                    <img className='w-16 h-16' src={loseImg} alt={result} />
                ) : (
                    <img className='w-16 h-16' src={drawImg} alt={result} />
                )
            }
            <span className='text-sm text-gray-900 dark:text-gray-200 max-w-32'>{game.message}</span>
            <button
                onClick={handleClick}
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                View Details
            </button>
        </div>
    )
}

export default HistoryIndividual
