import React, { useEffect, useMemo, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { useSelector } from 'react-redux';
import responsiveBoard from '../../../../utils/responsiveBoard';

const HistoryBoard = () => {

    const [boardWidth, setBoardWidth] = useState(400);

    const theme = useSelector(state => state.Theme.currentTheme);

    const boardOrientation = useSelector(state => state.Auth.boardOrientation)

    const historyGame = useSelector(state => state.Auth.historyGame);

    const customSquareStyle = (theme === "dark")
        ? {
            customDarkSquareStyle: { backgroundColor: "rgb(30 41 59)" },
            customLightSquareStyle: { backgroundColor: "rgb(148 163 184)" },
            clickedSquareColor: 'rgb(71 85 105)',
            possibleMoves: 'radial-gradient(circle, rgba(255,255,255,.2) 25%, transparent 25%)'
        }
        : {
            customDarkSquareStyle: { backgroundColor: "#779952" },
            customLightSquareStyle: { backgroundColor: "#edeed1" },
            clickedSquareColor: 'rgba(255, 255, 0, 0.4)',
            possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)'
        };

    const customPieces = useMemo(() => {
        const pieces = [
            "wP",
            "wN",
            "wB",
            "wR",
            "wQ",
            "wK",
            "bP",
            "bN",
            "bB",
            "bR",
            "bQ",
            "bK",
        ];
        const pieceComponents = {};
        pieces.forEach((piece) => {
            const imagePath = require(`../../../../static/images/pieces/${piece}.png`);
            pieceComponents[piece] = ({ squareWidth }) => (
                <div
                    style={{
                        width: squareWidth,
                        height: squareWidth,
                        backgroundImage: `url(${imagePath})`,
                        backgroundSize: "100%",
                    }}
                />
            );
        });
        return pieceComponents;
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const newBoardWidth = responsiveBoard(screenWidth);
            setBoardWidth(newBoardWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Chessboard
                id="Result Board"
                position={historyGame.fen()}
                customPieces={customPieces}
                arePiecesDraggable={false}
                customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                }}
                customDarkSquareStyle={customSquareStyle.customDarkSquareStyle}
                customLightSquareStyle={customSquareStyle.customLightSquareStyle}
                boardWidth={boardWidth}
                boardOrientation={boardOrientation}
            />
        </div>
    )
}

export default HistoryBoard
