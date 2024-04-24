import React from 'react'
import Chess from 'chess.js';
import { useSelector, useDispatch } from 'react-redux';
import Pawn from '../../Pieces/Pawn';
import Knight from '../../Pieces/Knight';
import Bishop from '../../Pieces/Bishop';
import Rook from '../../Pieces/Rook';
import King from '../../Pieces/King';
import Queen from '../../Pieces/Queen';
import updateGame from '../../../../redux/Bot/Actions/updateGame';
import updateBotAnalyzer from '../../../../redux/Bot/Actions/updateBotAnalyzer';
import updateBotResultOpen from '../../../../redux/Bot/Actions/updateBotResultOpen';

const BotHistory = () => {

    const botHistory = useSelector(state => state.Bot.botHistory);

    const game = useSelector(state => state.Bot.game);

    const dispatch = useDispatch();

    const handleViewHistory = (position, index) => {
        let newArray = botHistory.slice(0, index + 1);
        dispatch(updateBotAnalyzer(newArray));
        dispatch(updateGame(new Chess(position)));
        dispatch(updateBotResultOpen(false))
    }

    const renderPiece = (piece, c) => {

        let componentToRender;

        const color = (c === 'black') ? 'b' : 'w';

        switch (piece) {
            case 'P':
                componentToRender = <Pawn color={color} />;
                break;
            case 'N':
                componentToRender = <Knight color={color} />;
                break;
            case 'B':
                componentToRender = <Bishop color={color} />;
                break;
            case 'R':
                componentToRender = <Rook color={color} />;
                break;
            case 'K':
                componentToRender = <King color={color} />;
                break;
            case 'Q':
                componentToRender = <Queen color={color} />;
                break;
            default:
                componentToRender = <div></div>;
                break;
        }
        return componentToRender
    }

    return (
        <>
            {botHistory.length > 0 ? (
                <div className="shadow-md rounded-lg grid grid-cols-2 overflow-y-auto overflow-x-hidden" style={{ maxHeight: '65vh' }}>
                    <div className="odd-column border-r dark:border-gray-700">
                        {botHistory.map((item, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleViewHistory(item.position, index)}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 border-b cursor-pointer"
                                    >
                                        <div className="px-4 py-2 text-gray-900 dark:text-gray-50">
                                            {item.square.length > 2 ? (
                                                item.square.slice(0, 1) >= 'a' && item.square.slice(0, 1) <= 'h' ? (
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(game.fen() === item.position) ? 'bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece('P', item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square === "O-O" ? item.square : item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(game.fen() === item.position) ? ' bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece(item.square.slice(0, 1), item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square === "O-O" ? item.square : item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(game.fen() === item.position) ? ' bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                    {renderPiece('P', item.player)}
                                                    <div className='text-gray-900 dark:text-gray-200'>
                                                        {item.square}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="even-column">
                        {botHistory.map((item, index) => {
                            if (index % 2 !== 0) {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleViewHistory(item.position, index)}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 dark:border-gray-700 border-b cursor-pointer"
                                    >
                                        <div className="px-4 py-2">
                                            {item.square.length > 2 ? (
                                                item.square.slice(0, 1) >= 'a' && item.square.slice(0, 1) <= 'h' ? (
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(game.fen() === item.position) ? ' bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece('P', item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(game.fen() === item.position) ? ' bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece(item.square.slice(0, 1), item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(game.fen() === item.position) ? ' bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                    {renderPiece('P', item.player)}
                                                    <div className='text-gray-900 dark:text-gray-200'>
                                                        {item.square}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            ) : (
                <div className="uppercase border border-gray-400 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 p-2 text-center rounded-lg font-semibold text-sm text-gray-800 dark:text-gray-200" style={{ width: '170px' }}>
                    No moves yet!
                </div>
            )}
        </>
    )
}

export default BotHistory