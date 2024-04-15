import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Chess from 'chess.js';
import Pawn from '../../../ChessBoard/Pieces/Pawn';
import Knight from '../../../ChessBoard/Pieces/Knight';
import Bishop from '../../../ChessBoard/Pieces/Bishop';
import Rook from '../../../ChessBoard/Pieces/Rook';
import King from '../../../ChessBoard/Pieces/King';
import Queen from '../../../ChessBoard/Pieces/Queen';
import updateHistoryGame from '../../../../redux/Auth/Actions/updateHistoryGame';
import updateHistoryAnalyzer from '../../../../redux/Auth/Actions/setHistoryAnalyzer';

const HistoryTable = () => {

    const gameHistory = useSelector(state => state.Auth.moveHistory);

    const historyGame = useSelector(state => state.Auth.historyGame);

    const dispatch = useDispatch();

    const handleViewHistory = (position, index) => {
        let newArray = gameHistory.slice(0, index + 1);
        dispatch(updateHistoryAnalyzer(newArray));
        dispatch(updateHistoryGame(new Chess(position)));
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
            {gameHistory.length > 0 ? (
                <div className="shadow-md rounded-lg grid grid-cols-2 overflow-y-auto overflow-x-hidden" style={{ maxHeight: '65vh' }}>
                    <div className="odd-column border-r dark:border-gray-700">
                        {gameHistory.map((item, index) => {
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
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(historyGame.fen() === item.position) ? 'bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece('P', item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(historyGame.fen() === item.position) ? 'bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece(item.square.slice(0, 1), item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(historyGame.fen() === item.position) ? 'bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
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
                        {gameHistory.map((item, index) => {
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
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(historyGame.fen() === item.position) ? 'bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece('P', item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(historyGame.fen() === item.position) ? 'bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
                                                        {renderPiece(item.square.slice(0, 1), item.player)}
                                                        <div className='text-gray-900 dark:text-gray-200'>
                                                            {item.square.slice(1)}
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className={`p-1.5 rounded-md flex flex-row items-center justify-center ${(historyGame.fen() === item.position) ? 'bg-gray-200 dark:bg-gray-700' : 'border-none'}`}>
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

export default HistoryTable
