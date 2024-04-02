import React from 'react'
import Chess from 'chess.js';
import { useSelector, useDispatch } from 'react-redux';
import updateGame from '../../../../redux/MultiPlayer/Actions/updateGame';
import updateGameAnalyzer from '../../../../redux/MultiPlayer/Actions/updateGameAnalyzer';
import Pawn from '../../Pieces/Pawn';
import Knight from '../../Pieces/Knight';
import Bishop from '../../Pieces/Bishop';
import Rook from '../../Pieces/Rook';
import King from '../../Pieces/King';
import Queen from '../../Pieces/Queen';

const MobileGameHistory = () => {

    const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);

    const dispatch = useDispatch();

    const handleViewHistory = (position, index) => {
        let newArray = gameHistory.slice(0, index + 1);
        dispatch(updateGameAnalyzer(newArray));
        dispatch(updateGame(new Chess(position)));
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
            <div className="inline-flex rounded-md shadow-sm" role="group">
                {
                    (gameHistory.length > 0) && gameHistory.map((item, index) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => handleViewHistory(item.position, index)}
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                            {
                                (item.square.length > 2) ?
                                    (
                                        (item.square.slice(0, 1) >= 'a' && item.square.slice(0, 1) <= 'h') ?
                                            (
                                                <div className='flex flex-row'>
                                                    {renderPiece('P', item.player)}
                                                    {item.square.slice(1)}
                                                </div>
                                            )
                                            :
                                            (
                                                <div className='flex flex-row'>
                                                    {renderPiece(item.square.slice(0, 1), item.player)}
                                                    {item.square.slice(1)}
                                                </div>
                                            )
                                    ) :
                                    (
                                        <div className='flex flex-row'>
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

export default MobileGameHistory
