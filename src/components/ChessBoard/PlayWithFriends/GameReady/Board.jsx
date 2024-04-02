import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Chessboard } from 'react-chessboard'
import socket from '../../../../socket/socket';
import updateGame from '../../../../redux/MultiPlayer/Actions/updateGame';
import Chess from 'chess.js'
import updateTurn from '../../../../redux/MultiPlayer/Actions/updateTurn';
import updatePosition from '../../../../redux/MultiPlayer/Actions/updatePoisition';
import responsiveBoard from '../../../../utils/responsiveBoard';

const Board = () => {
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    const [boardWidth, setBoardWidth] = useState(400);
    const [clickedPiece, setClickedPiece] = useState(null);

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const gameId = useSelector(state => state.MultiPlayer.gameId);

    const game = useSelector(state => state.MultiPlayer.game);

    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);

    const boardPosition = useSelector(state => state.MultiPlayer.position);

    const result = useSelector(state => state.MultiPlayer.gameResult)

    const dispatch = useDispatch();

    const oppositionPlayer = (boardOrientation === 'white') ? 'b' : 'w';

    const username = boardOrientation;

    const customSquareStyles = (currentTheme === "dark")
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
                        ? "radial-gradient(circle, rgba(0, 0, 1,.5) 85%, transparent 85%)"
                        : customSquareStyles.possibleMoves,
                borderRadius: "50%",
            };
            return move;
        });
        newSquares[square] = {
            background: customSquareStyles.clickedSquareColor,
        };
        setOptionSquares(newSquares);
        return true;
    }


    function onSquareClick(square) {
        if (game.fen() !== boardPosition || result.has(gameId)) {
            return;
        }

        setRightClickedSquares({});

        const currentClick = game.get(square);

        // Check if it's the current player's turn and they clicked on the opponent's piece
        if (moveFrom && currentClick && currentClick.color === oppositionPlayer) {
            setClickedPiece(currentClick)
            const gameCopy = new Chess(game.fen());
            const move = gameCopy.move({
                from: moveFrom,
                to: square,
                promotion: "q", // Assume promotion to queen for simplicity
            });

            // Check if the move is valid
            if (move !== null) {
                setMoveTo(square);
                if (move.flags.includes("p") && move.captured && (square[1] === "8" || square[1] === "1")) {
                    setShowPromotionDialog(true);
                } else {
                    setMoveFrom("");
                    setMoveTo(null);
                    setOptionSquares({});
                    dispatch(updatePosition(game.fen()));
                    const newMove = gameCopy.history();
                    socket.emit("move", { room: gameId, game: gameCopy, position: gameCopy.fen(), turn: gameCopy.turn(), move: { square: newMove[0], position: gameCopy.fen(), player: username, captured: currentClick } });
                    dispatch(updateGame(gameCopy))
                }
                return;
            }
        } else if (currentClick && currentClick.color === oppositionPlayer) {
            return;
        } else {
            setClickedPiece(null);

            // from square
            if (!moveFrom) {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions) setMoveFrom(square);
                return;
            }

            // to square
            if (!moveTo) {
                // check if valid move before showing dialog
                const moves = game.moves({ moveFrom, verbose: true });
                const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

                // not a valid move
                if (!foundMove) {
                    // check if clicked on a new piece
                    const hasMoveOptions = getMoveOptions(square);
                    // if new piece, setMoveFrom; otherwise, clear moveFrom
                    setMoveFrom(hasMoveOptions ? square : "");
                    return;
                }

                // valid move
                setMoveTo(square);

                // if promotion move
                if ((foundMove.color === "w" && foundMove.piece === "p" && square[1] === "8") || (foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1")) {
                    const newMove = game.history();
                    setShowPromotionDialog(true);
                    socket.emit("move", { room: gameId, game, position: game.fen(), turn: game.turn, move: { square: newMove[0], position: game.fen(), player: username, captured: null } });
                    return;
                }

                // is normal move
                const gameCopy = { ...game };
                const move = gameCopy.move({ from: moveFrom, to: square, promotion: "q" });

                // if invalid, setMoveFrom and getMoveOptions
                if (move === null) {
                    const hasMoveOptions = getMoveOptions(square);
                    if (hasMoveOptions) setMoveFrom(square);
                    return;
                }

                setMoveFrom("");
                setMoveTo(null);
                setOptionSquares({});
                const newMove = game.history();
                socket.emit("move", { room: gameId, game, position: game.fen(), turn: game.turn, move: { square: newMove[0], position: game.fen(), player: username, captured: null } });
                return;
            }
        }
    }


    function onPromotionPieceSelect(piece) {
        if (piece) {
            const gameCopy = new Chess(game.fen());
            const move = gameCopy.move({
                from: moveFrom,
                to: moveTo,
                promotion: piece[1].toLowerCase() ?? "q",
            });

            if (move !== null) {
                // Send move details including the captured piece (if any)
                const newMove = gameCopy.history();
                socket.emit("move", {
                    room: gameId,
                    game: gameCopy,
                    position: gameCopy.fen(),
                    turn: gameCopy.turn(),
                    move: {
                        square: newMove[0],
                        position: gameCopy.fen(),
                        player: username,
                        captured: move.captured ? clickedPiece : null,
                    },
                });
                dispatch(updateGame(gameCopy)); // Update Redux state with the new game state after promotion
            }
        }

        // Reset states after the promotion move
        setMoveFrom("");
        setMoveTo(null);
        setShowPromotionDialog(false);
        setOptionSquares({});
        return
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
        if (game.in_checkmate()) {
            console.log("checkmate!!!")
        }
        socket.on("board-orientation", (data) => {
            if (data.orientation === 'white') {
                dispatch(updateTurn(true));
            } else {
                dispatch(updateTurn(false));
            }
        })
        socket.on("board", (data) => {
            if (boardOrientation !== data.move.player) {
                dispatch(updateTurn(true))
            } else {
                dispatch(updateTurn(false))
            }
        })
    })

    useEffect(() => {
        // Cleanup function to reset chess instance when component unmounts
        return () => {
            const newGame = new Chess();
            dispatch(updateGame(newGame));
        };
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const boardWidth = responsiveBoard(screenWidth);
            setBoardWidth(boardWidth);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    return (
        <div>
            <Chessboard
                id="PlayWithFriends"
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
                customDarkSquareStyle={customSquareStyles.customDarkSquareStyle}
                customLightSquareStyle={customSquareStyles.customLightSquareStyle}
                promotionToSquare={moveTo}
                showPromotionDialog={showPromotionDialog}
                boardWidth={boardWidth}
                boardOrientation={boardOrientation}
                customPieces={customPieces}
            />
        </div>
    );
}

export default Board