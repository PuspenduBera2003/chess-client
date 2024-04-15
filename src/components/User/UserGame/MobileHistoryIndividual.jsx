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

const MobileHistoryIndividual = (props) => {
    const { game } = props;
    const [color, setColor] = useState('white');
    const [result, setResult] = useState('');
    const userDetails = useSelector(state => state.Auth.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        if (game.white_id === userDetails.id) {
            setColor('white');
        } else {
            setColor('black')
        }
    }, [game.white_id, userDetails.id])

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

    return (
        <div className='flex flex-row items-center justify-between w-full m-2 border dark:border-gray-400 gap-3 rounded-lg shadow-md'>
            <img className='w-32 sm:w-48 md:w-48 object-cover rounded-l-lg' src={game.opponent_photo} alt={game.opponent_name} />
            <div className='flex flex-wrap items-center justify-center gap-2'>
                {
                    (result === 'W') ? (
                        <img className='w-20  md:w-32' src={winImg} alt={result} />
                    ) : (result === 'L') ? (
                        <img className='w-20  md:w-32' src={loseImg} alt={result} />
                    ) : (
                        <img className='w-20  md:w-32' src={drawImg} alt={result} />
                    )
                }
                <button
                    onClick={handleClick}
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm p-2 text-center me-2 mb-2">
                    Details
                </button>
            </div>
        </div>
    )
}

export default MobileHistoryIndividual
