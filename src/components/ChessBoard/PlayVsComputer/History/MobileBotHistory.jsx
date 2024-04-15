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

const MobileBotHistory = () => {

    const botHistory = useSelector(state => state.Bot.botHistory);

    const game = useSelector(state => state.Bot.game)

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
        <div>
            <div className="inline-flex rounded-md shadow-sm" role="group">
                {
                    (botHistory.length > 0) ? botHistory.map((item, index) => (
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
                    )) :
                        (
                            <div className="uppercase border border-gray-400 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 p-2 text-center rounded-lg font-semibold text-sm text-gray-800 dark:text-gray-200" style={{ width: '170px' }}>
                                No moves yet!
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default MobileBotHistory
