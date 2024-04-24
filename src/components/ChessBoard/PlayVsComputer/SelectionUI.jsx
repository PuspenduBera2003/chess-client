import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PieceSelector from '../PlayWithFriends/PieceSelector';
import BotSelector from './BotSelector';
import PlayVsComputer from './PlayVsComputer';
import updateTurn from '../../../redux/Bot/Actions/updateTurn';
import { useSpring, animated } from 'react-spring';
import Chess from 'chess.js';
import updateGame from '../../../redux/Bot/Actions/updateGame';
import updatePosition from '../../../redux/Bot/Actions/updatePosition';
import updateBotHistory from '../../../redux/Bot/Actions/updateBotHistory';
import updateBotAnalyzer from '../../../redux/Bot/Actions/updateBotAnalyzer';

const SelectionUI = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);
    const dispatch = useDispatch();

    const animationProps = useSpring({
        from: { transform: 'translateY(50px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: { tension: 300, friction: 10 },
    });

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    const [clicked, setClicked] = useState(false);
    const selectedPiece = useSelector(state => state.MultiPlayer.pieceSelection);
    const handleClick = () => {
        const newMatch = new Chess();
        dispatch(updateGame(newMatch));
        dispatch(updatePosition(newMatch.fen()));
        dispatch(updateBotHistory([]));
        dispatch(updateBotAnalyzer([]));
        setClicked(true)
        if (selectedPiece === 'white') {
            dispatch(updateTurn(false));
        } else {
            dispatch(updateTurn(true));
        }
    }

    return (
        <div className={`${gradientClasses} flex items-center justify-center py-2`} style={{ minHeight: 'calc(100vh - 3.75rem)' }}>
            {
                !clicked ?
                    <animated.div
                        style={animationProps}
                        className='flex flex-col gap-3 items-center justify-center bg-gray-50 border dark:border-gray-500 dark:bg-gray-800 p-3 rounded-md shadow-lg m-1'>
                        <span className='text-black dark:text-white font-semibold my-2'>
                            Select Your Piece
                        </span>
                        <PieceSelector />
                        <span className='text-black dark:text-white font-semibold'>
                            Select Your Opponent
                        </span>
                        <BotSelector />
                        <button
                            onClick={handleClick}
                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Start Game
                            </span>
                        </button>
                    </animated.div>
                    :
                    <div className='w-full flex items-center justify-center m-1'>
                        <PlayVsComputer />
                    </div>
            }
        </div>
    )
}

export default SelectionUI
