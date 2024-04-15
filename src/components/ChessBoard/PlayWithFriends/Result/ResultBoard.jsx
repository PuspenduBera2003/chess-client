import React, { useEffect, useMemo, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { useSelector } from 'react-redux';
import customBoardStyle from '../../../../utils/boardTheme';
import responsiveBoard from '../../../../utils/responsiveBoard';

const ResultBoard = () => {

    const boardPosition = useSelector(state => state.MultiPlayer.position);

    const boardTheme = useSelector(state => state.MultiPlayer.boardTheme);

    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);

    const [boardWidth, setBoardWidth] = useState(400);

    const customSquareStyle = (boardTheme === "dark")
        ? {
            customDarkSquareStyle: { backgroundColor: "rgb(30 41 59)" },
            customLightSquareStyle: { backgroundColor: "rgb(100 116 139)" },
            clickedSquareColor: 'rgba(254, 215, 170, 0.4)',
            possibleMoves: 'radial-gradient(circle, rgba(255,255,255,.2) 25%, transparent 25%)'
        }
        : {
            customDarkSquareStyle: { backgroundColor: "#779952" },
            customLightSquareStyle: { backgroundColor: "#edeed1" },
            clickedSquareColor: 'rgba(255, 255, 0, 0.4)',
            possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)'
        };

    const [customSquareStyles, setCustomSquareStyles] = useState(customSquareStyle);

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
        const boardStyle = customBoardStyle(boardTheme);
        setCustomSquareStyles(boardStyle);
    }, [boardTheme])

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
                position={boardPosition}
                customPieces={customPieces}
                arePiecesDraggable={false}
                customBoardStyle={{
                    borderRadius: "4px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
                }}
                customDarkSquareStyle={customSquareStyles.customDarkSquareStyle}
                customLightSquareStyle={customSquareStyles.customLightSquareStyle}
                boardWidth={boardWidth}
                boardOrientation={boardOrientation}
            />
        </div>
    )
}

export default ResultBoard
