import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Board from './Board';
import BotHistory from './History/BotHistory';
import PlayerDetails from './PlayerDetails/PlayerDetails';
import OpponentDetails from './PlayerDetails/OpponentDetails';
import Controls from './History/Controls';
import MobileBotHistory from './History/MobileBotHistory';
import updateBotResult from '../../../redux/Bot/Actions/updateBotResult';
import updateGame from '../../../redux/MultiPlayer/Actions/updateGame';
import Chess from 'chess.js';
import updateBotHistory from '../../../redux/Bot/Actions/updateBotHistory';
import updateBotAnalyzer from '../../../redux/Bot/Actions/updateBotAnalyzer';
import updatePosition from '../../../redux/Bot/Actions/updatePosition';
import updateBotResultOpen from '../../../redux/Bot/Actions/updateBotResultOpen';
import ResultBoard from './Result/ResultBoard';
import Result from './Result/Result';
import MobileControls from './History/MobileControls';

const PlayVsComputer = () => {

    const dispatch = useDispatch();

    const currentTheme = useSelector(state => state.Theme.currentTheme);
    const game = useSelector(state => state.Bot.game);
    const open = useSelector(state => state.Bot.resultOpen);
    const botHistory = useSelector(state => state.Bot.botHistory);
    const selectedPiece = useSelector(state => state.MultiPlayer.pieceSelection);
    const currentPlayer = (selectedPiece === 'white') ? 'w' : 'b'

    const gradientClasses = currentTheme === 'dark' ? 'dark-mode-landing-page' : 'light-mode-landing-page';

    useEffect(() => {
        if (game.in_checkmate()) {
            if (game.turn() === currentPlayer) {
                dispatch(updateBotResult('L'));
            } else {
                dispatch(updateBotResult('W'));
            }
            dispatch(updateBotResultOpen(true))
        } else if (game.in_stalemate()) {
            dispatch(updateBotResult('SD'));
            dispatch(updateBotResultOpen(true))
        } else if (game.in_draw()) {
            dispatch(updateBotResult('D'));
            dispatch(updateBotResultOpen(true))
        }
    }, [game, dispatch, currentPlayer]);

    useEffect(() => {
        dispatch(updateGame(new Chess()));
        dispatch(updateBotHistory([]));
        dispatch(updateBotAnalyzer([]));
        dispatch(updatePosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));
    }, [])

    return (
        <div className={`chessboard-layout flex flex-wrap gap-2 md:gap-4 lg:gap-6 items-center justify-center text-gray-900 bg-gradient-to-r ${gradientClasses} p-2`}>
            <div className='flex flex-col gap-2'>
                <OpponentDetails />
                <div className={`${open ? 'hidden' : 'block'}`}>
                    <Board />
                </div>
                <div className={`${open ? 'block' : 'hidden'} relative`}>
                    <ResultBoard />
                    <Result />
                </div>
                <PlayerDetails />
            </div>
            <div
                className='hidden md:flex items-center justify-center overflow-y-auto overflow-x-hidden p-2 rounded-lg relative' style={{ height: '80vh' }}>
                <BotHistory />
                <Controls />
            </div>
            {
                botHistory.length &&
                <div className='flex flex-col items-center justify-center gap-4 md:hidden overflow-x-auto rounded-lg p-2' style={{ maxWidth: '90vw' }}>
                    <MobileBotHistory />
                </div>
            }
            {
                botHistory.length > 1 &&
                <div className='flex md:hidden'>
                    <div style={{ flexGrow: 1, flexBasis: 0 }}>
                        <MobileControls />
                    </div>
                </div>
            }
        </div>
    )
}

export default PlayVsComputer
