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

const GameHistory = () => {

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
        <>
            {
                (gameHistory.length > 0) ?
                    (
                        <div className="shadow-md rounded-lg">
                            <table className="rounded-lg text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Pieces
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Move
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {gameHistory.map((item, index) => (
                                        <tr
                                            key={index}
                                            onClick={() => handleViewHistory(item.position, index)}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.player}
                                            </th>
                                            <td className="px-6 py-4">
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
                                            </td>
                                        </tr>
                                    ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) :
                    (
                        <div className='uppercase border border-gray-400 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 p-2 text-center rounded-lg font-semibold text-sm text-gray-800 dark:text-gray-200' style={{ width: '170px' }}>
                            No moves yet!
                        </div>
                    )
            }
        </>
    )
}

export default GameHistory
