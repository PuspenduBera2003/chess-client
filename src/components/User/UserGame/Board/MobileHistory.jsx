import React from 'react'
import Chess from 'chess.js';
import { useSelector, useDispatch } from 'react-redux';
import updateHistoryGame from '../../../../redux/Auth/Actions/updateHistoryGame';
import Pawn from '../../../ChessBoard/Pieces/Pawn';
import Knight from '../../../ChessBoard/Pieces/Knight';
import Bishop from '../../../ChessBoard/Pieces/Bishop';
import Rook from '../../../ChessBoard/Pieces/Rook';
import King from '../../../ChessBoard/Pieces/King';
import Queen from '../../../ChessBoard/Pieces/Queen';
import updateHistoryAnalyzer from '../../../../redux/Auth/Actions/setHistoryAnalyzer';

const MobileHistory = () => {

    const gameHistory = useSelector(state => state.Auth.moveHistory);

    const game = useSelector(state => state.Auth.historyGame);

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
        <div>
            <div className="inline-flex rounded-md shadow-sm">
                {
                    (gameHistory.length > 0) && gameHistory.map((item, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => handleViewHistory(item.position, index)}
                            className={`px-4 py-2 text-sm font-medium text-gray-900 hover:text-blue-700 dark:text-white dark:hover:text-white ${(game.fen() === item.position) ? 'bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500' : 'bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                            {
                                (item.square.length > 2) ?
                                    (
                                        (item.square.slice(0, 1) >= 'a' && item.square.slice(0, 1) <= 'h') ?
                                            (
                                                <div className={`flex flex-row items-center justify-center`}>
                                                    {renderPiece('P', item.player)}
                                                    {item.square.slice(1)}
                                                </div>
                                            )
                                            :
                                            (
                                                <div className={`flex flex-row items-center justify-center`}>
                                                    {renderPiece(item.square.slice(0, 1), item.player)}
                                                    {item.square.slice(1)}
                                                </div>
                                            )
                                    ) :
                                    (
                                        <div className={`flex flex-row items-center justify-center`}>
                                            {renderPiece('P', item.player)}
                                            {item.square}
                                        </div>
                                    )
                            }
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default MobileHistory