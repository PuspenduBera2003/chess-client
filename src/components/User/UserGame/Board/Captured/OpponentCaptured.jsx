import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pawn from '../../../../ChessBoard/Pieces/Pawn';
import Knight from '../../../../ChessBoard/Pieces/Knight';
import Bishop from '../../../../ChessBoard/Pieces/Bishop';
import Rook from '../../../../ChessBoard/Pieces/Rook';
import Queen from '../../../../ChessBoard/Pieces/Queen';

const OpponentCaptured = () => {
    const gameAnalyzer = useSelector(state => state.Auth.historyAnalyzer);
    const boardOrientation = useSelector(state => state.Auth.boardOrientation);
    const currentPlayer = boardOrientation === 'white' ? 'w' : 'b';

    const renderPiece = (piece) => {
        let componentToRender = null;
        switch (piece.type) {
            case 'p':
                componentToRender = <Pawn color={piece.color} />;
                break;
            case 'n':
                componentToRender = <Knight color={piece.color} />;
                break;
            case 'b':
                componentToRender = <Bishop color={piece.color} />;
                break;
            case 'r':
                componentToRender = <Rook color={piece.color} />;
                break;
            case 'q':
                componentToRender = <Queen color={piece.color} />;
                break;
            default:
                break;
        }
        return componentToRender;
    };

    const [capturedPieces, setCapturedPieces] = useState({
        p: [],
        n: [],
        b: [],
        r: [],
        q: [],
    });

    useEffect(() => {
        const newCapturedPieces = { p: [], n: [], b: [], r: [], q: [] };

        gameAnalyzer.forEach(item => {
            if (item.captured && Array.isArray(item.captured)) {
                item.captured.forEach(capturedPiece => {
                    if (capturedPiece.color === currentPlayer) {
                        newCapturedPieces[capturedPiece.type].push(capturedPiece.color);
                    }
                });
            } else if (item.captured && item.captured.color === currentPlayer) {
                newCapturedPieces[item.captured.type].push(item.captured.color);
            }
        });

        setCapturedPieces(newCapturedPieces);
    }, [gameAnalyzer, currentPlayer]);

    return (
        <div className='flex flex-row gap-2'>
            {capturedPieces.p.length > 0 && (
                <div className='flex flex-row flex-wrap relative'>
                    {capturedPieces.p.map((color, index) => (
                        <div key={index} className='relative' style={{ marginRight: '-12px' }}>
                            {renderPiece({ type: 'p', color })}
                        </div>
                    ))}
                </div>
            )}
            {capturedPieces.n.length > 0 && (
                <div className='flex flex-row flex-wrap relative'>
                    {capturedPieces.n.map((color, index) => (
                        <div key={index} className='relative' style={{ marginRight: '-12px' }}>
                            <Knight key={index} color={color} />
                        </div>
                    ))}
                </div>
            )}
            {capturedPieces.b.length > 0 && (
                <div className='flex flex-row flex-wrap relative'>
                    {capturedPieces.b.map((color, index) => (
                        <div key={index} className='relative' style={{ marginRight: '-12px' }}>
                            <Bishop key={index} color={color} />
                        </div>
                    ))}
                </div>
            )}
            {capturedPieces.r.length > 0 && (
                <div className='flex flex-row flex-wrap relative'>
                    {capturedPieces.r.map((color, index) => (
                        <div key={index} className='relative' style={{ marginRight: '-12px' }}>
                            <Rook key={index} color={color} />
                        </div>
                    ))}
                </div>
            )}
            {capturedPieces.q.length > 0 && (
                <div className='flex flex-row flex-wrap relative'>
                    {capturedPieces.q.map((color, index) => (
                        <div key={index} className='relative' style={{ marginRight: '-12px' }}>
                            <Queen key={index} color={color} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OpponentCaptured;