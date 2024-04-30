import React, { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Chessboard } from 'react-chessboard'
import socket from '../../../../socket/socket';
import updateGame from '../../../../redux/MultiPlayer/Actions/updateGame';
import Chess from 'chess.js'
import updateTurn from '../../../../redux/MultiPlayer/Actions/updateTurn';
import updatePosition from '../../../../redux/MultiPlayer/Actions/updatePoisition';
import responsiveBoard from '../../../../utils/responsiveBoard';
import addPromoted from '../../../../redux/MultiPlayer/Actions/updateAddPromoted';
import updateAtBeginning from '../../../../redux/MultiPlayer/Actions/updateAtBeginning';
import customBoardStyle from '../../../../utils/boardTheme';

const Board = () => {
    const [moveFrom, setMoveFrom] = useState("");
    const [moveTo, setMoveTo] = useState(null);
    const [showPromotionDialog, setShowPromotionDialog] = useState(false);
    const [rightClickedSquares, setRightClickedSquares] = useState({});
    const [moveSquares, setMoveSquares] = useState({});
    const [optionSquares, setOptionSquares] = useState({});
    const [boardWidth, setBoardWidth] = useState(400);
    const [clickedPiece, setClickedPiece] = useState(null);
    const [currentMove, setCurrentMove] = useState('');

    const boardTheme = useSelector(state => state.MultiPlayer.boardTheme);

    const gameId = useSelector(state => state.MultiPlayer.gameId);

    const game = useSelector(state => state.MultiPlayer.game);

    const newMove = useSelector(state => state.MultiPlayer.newMove)

    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);

    const promoted = useSelector(state => state.MultiPlayer.promoted);

    const boardPosition = useSelector(state => state.MultiPlayer.position);

    const result = useSelector(state => state.MultiPlayer.gameResult)

    const dispatch = useDispatch();

    const oppositionPlayer = (boardOrientation === 'white') ? 'b' : 'w';

    const username = boardOrientation;

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

    useEffect(() => {
        const boardStyle = customBoardStyle(boardTheme);
        setCustomSquareStyles(boardStyle);
    }, [boardTheme])

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
                const newMove = gameCopy.history();
                if (move.flags.includes("p") && move.captured && (square[1] === "8" || square[1] === "1")) {
                    setShowPromotionDialog(true);
                } else {
                    if (promoted.has(move.from)) {
                        socket.emit("move", { room: gameId, game: gameCopy, position: gameCopy.fen(), turn: gameCopy.turn(), move: { square: newMove[0], position: gameCopy.fen(), newMove: move.to, player: username, captured: currentClick, promoted: { to: move.to, from: move.from } } });
                    } else if (promoted.has(move.to)) {
                        socket.emit("move", { room: gameId, game: gameCopy, position: gameCopy.fen(), turn: gameCopy.turn(), move: { square: newMove[0], position: gameCopy.fen(), newMove: move.to, player: username, captured: null, promotedCaptured: move.to } });
                    } else {
                        socket.emit("move", { room: gameId, game: gameCopy, position: gameCopy.fen(), turn: gameCopy.turn(), move: { square: newMove[0], position: gameCopy.fen(), newMove: move.to, player: username, captured: currentClick } });
                    }
                    setMoveFrom("");
                    setMoveTo(null);
                    setOptionSquares({});
                    dispatch(updatePosition(game.fen()));
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
                    setShowPromotionDialog(true);
                }
                else {
                    // is normal move
                    const gameCopy = { ...game };
                    const move = gameCopy.move({ from: moveFrom, to: square, promotion: "q" });

                    // if invalid, setMoveFrom and getMoveOptions
                    if (move === null) {
                        const hasMoveOptions = getMoveOptions(square);
                        if (hasMoveOptions) setMoveFrom(square);
                        return;
                    }
                    const newMove = game.history();
                    if (promoted.has(move.from)) {
                        socket.emit("move", { room: gameId, game, position: game.fen(), turn: game.turn(), move: { square: newMove[0], position: game.fen(), newMove: move.to, player: username, captured: null, promoted: { to: move.to, from: move.from } } })
                    } else {
                        socket.emit("move", { room: gameId, game, position: game.fen(), turn: game.turn(), move: { square: newMove[0], position: game.fen(), newMove: move.to, player: username, captured: null } });
                    }
                    setMoveFrom("");
                    setMoveTo(null);
                    setOptionSquares({});
                }
            }
        }
        dispatch(updateAtBeginning(false));
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
                        newMove: move.to,
                        player: username,
                        captured: move.captured ? [clickedPiece, { type: 'p', color: move.color }] : { type: 'p', color: move.color },
                        promoted: { to: move.to, from: move.from }
                    },
                });
                dispatch(addPromoted({ promotedPiece: move.to }));
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
        setCurrentMove({ [newMove]: { backgroundColor: customSquareStyles.currentMove } });
    }, [newMove, customSquareStyles]);

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
                    ...currentMove
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