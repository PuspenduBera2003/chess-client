import React, { useEffect, useMemo, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import responsiveBoard from '../../../utils/responsiveBoard';
import { useDispatch, useSelector } from 'react-redux';
import updateBotHistory from '../../../redux/Bot/Actions/updateBotHistory';
import updateGame from '../../../redux/Bot/Actions/updateGame';
import updateTurn from '../../../redux/Bot/Actions/updateTurn';
import updatePosition from '../../../redux/Bot/Actions/updatePosition';
import updateBotAnalyzer from '../../../redux/Bot/Actions/updateBotAnalyzer';
import Chess from 'chess.js';

const Board = () => {

    const dispatch = useDispatch();

    const stockfish = new Worker(`${process.env.PUBLIC_URL}/stockfish.js`);
    const botLevel = useSelector(state => state.Bot.botLevel);
    const selectedPiece = useSelector(state => state.MultiPlayer.pieceSelection);
    const currentPlayer = (selectedPiece === 'white') ? 'w' : 'b';
    const DEPTH = botLevel;

    const game = useSelector(state => state.Bot.game)
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    const [boardWidth, setBoardWidth] = useState(400);

    const botHistory = useSelector(state => state.Bot.botHistory);
    const turn = useSelector(state => state.Bot.turn);
    const currentPosition = useSelector(state => state.Bot.position);
    const theme = useSelector(state => state.Theme.currentTheme);

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

    function getMoveOptions(square) {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }

        const newSquares = {};
        moves.map((move) => {
            newSquares[move.to] = {
                background:
                    game.get(move.to) &&
                        game.get(move.to).color !== game.get(square).color
                        ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
                        : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
                borderRadius: "50%",
            };
            return move;
        });
        newSquares[square] = {
            background: "rgba(255, 255, 0, 0.4)",
        };
        setOptionSquares(newSquares);
        return true;
    }

    function onSquareClick(square) {
        if ((currentPosition !== game.fen()) || (game.turn() !== currentPlayer)) {
            return;
        }
        const currentClick = game.get(square);
        setRightClickedSquares({});

        // from square
        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions) setMoveFrom(square);
            return;
        }

        // to square
        if (!moveTo) {
            // check if valid move before showing dialog
            const moves = game.moves({
                moveFrom,
                verbose: true,
            });
            const foundMove = moves.find(
                (m) => m.from === moveFrom && m.to === square
            );
            // not a valid move
            if (!foundMove) {
                // check if clicked on new piece
                const hasMoveOptions = getMoveOptions(square);
                // if new piece, setMoveFrom, otherwise clear moveFrom
                setMoveFrom(hasMoveOptions ? square : "");
                return;
            }

            // valid move
            setMoveTo(square);

            // if promotion move
            if (
                (foundMove.color === "w" &&
                    foundMove.piece === "p" &&
                    square[1] === "8") ||
                (foundMove.color === "b" &&
                    foundMove.piece === "p" &&
                    square[1] === "1")
            ) {
                setShowPromotionDialog(true);
                return;
            }

            // is normal move
            const gameCopy = { ...game };
            const player = (game.turn() === 'w') ? 'white' : 'black'
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: "q",
            });

            // if invalid, setMoveFrom and getMoveOptions
            if (move === null) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            let captured = null;
            if (move.captured) {
                captured = currentClick
            }

            const newMove = { square: game.history().pop(), position: gameCopy.fen(), player, captured }
            const updatedHistory = [...botHistory, newMove];
            dispatch(updateBotHistory(updatedHistory));
            dispatch(updateBotAnalyzer(updatedHistory));
            dispatch(updateGame(gameCopy));
            setMoveFrom("");
            setMoveTo(null);
            setOptionSquares({});
            dispatch(updateTurn(true));
            dispatch(updatePosition(game.fen()));
            return;
        }
    }

    function onPromotionPieceSelect(piece) {
        // if no piece passed then user has cancelled dialog, don't make move and reset
        if (piece) {
            const gameCopy = { ...game };
            const player = (game.turn() === 'w') ? 'white' : 'black'
            const currentClick = game.get(moveTo);
            const move = gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q",
            });
            let captured = null;
            if (move.captured) {
                captured = currentClick
            }
            dispatch(updateGame(gameCopy));
            const newMove = { square: game.history().pop(), position: gameCopy.fen(), player, captured, promoted: { to: move.to, from: move.from } };
            const updatedHistory = [...botHistory, newMove];
            dispatch(updateBotHistory(updatedHistory));
            dispatch(updateBotAnalyzer(updatedHistory))
        }

        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        dispatch(updateTurn(true));
        dispatch(updatePosition(game.fen()));
        return true;
    }

    function onSquareRightClick(square) {
        const colour = "rgba(0, 0, 255, 0.4)";
        setRightClickedSquares({
            ...rightClickedSquares,
            [square]:
                rightClickedSquares[square] &&
                    rightClickedSquares[square].backgroundColor === colour
                    ? undefined
                    : { backgroundColor: colour },
        });
    }

    useEffect(() => {
        function findBestMove() {
            const fenPosition = game.fen();

            stockfish.postMessage("uc679i");
            stockfish.postMessage(`position fen ${fenPosition}`);
            stockfish.postMessage(`go depth ${DEPTH}`);

            stockfish.onmessage = (e) => {
                const message = e.data;

                if (message.startsWith("bestmove")) {
                    const bestMoveMatch = message.match(/bestmove (\S+)/);
                    if (bestMoveMatch && bestMoveMatch.length > 1) {
                        const bestMove = bestMoveMatch[1];
                        const player = (game.turn() === 'w') ? 'white' : 'black'
                        const currentClick = game.get(bestMove.substring(2, 4))
                        const move = game.move({
                            from: bestMove.substring(0, 2),
                            to: bestMove.substring(2, 4),
                            promotion: bestMove.substring(4, 5),
                        });
                        let captured = null;
                        let promoted = null;
                        if (move && move.captured) {
                            captured = currentClick
                        }
                        if (move && move.flags && move.flags.includes("p")) {
                            promoted = { to: move.to, from: move.from }
                        }
                        const newMove = { square: game.history().pop(), position: game.fen(), player, captured, promoted }
                        const updatedHistory = [...botHistory, newMove];
                        dispatch(updateBotHistory(updatedHistory));
                        dispatch(updateBotAnalyzer(updatedHistory))
                        dispatch(updatePosition(game.fen()));
                        dispatch(updateGame(new Chess(game.fen())));
                    }
                }
            };
        }
        if (turn) {
            findBestMove();
            dispatch(updateTurn(false));
        }
    }, [turn])

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
            const imagePath = require(`../../../static/images/pieces/${piece}.png`);
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
        <Chessboard
            id="ClickToMove"
            animationDuration={200}
            arePiecesDraggable={false}
            position={game.fen()}
            onSquareClick={onSquareClick}
            onSquareRightClick={onSquareRightClick}
            onPromotionPieceSelect={onPromotionPieceSelect}
            customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
            }}
            customSquareStyles={{
                ...moveSquares,
                ...optionSquares,
                ...rightClickedSquares,
            }}
            customDarkSquareStyle={customSquareStyle.customDarkSquareStyle}
            customLightSquareStyle={customSquareStyle.customLightSquareStyle}
            customPieces={customPieces}
            promotionToSquare={moveTo}
            showPromotionDialog={showPromotionDialog}
            boardWidth={boardWidth}
            boardOrientation={selectedPiece}
        />
    );
};

export default Board;