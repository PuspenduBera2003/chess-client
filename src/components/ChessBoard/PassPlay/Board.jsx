import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Chessboard } from "react-chessboard";
import { useSelector, useDispatch } from 'react-redux'
import gameSituation from '../../../redux/OfflinePlay/Actions/PassPlayGame';
import updateRightClickedSquares from '../../../redux/OfflinePlay/Actions/PassPlayRightClickedSquares';
import updateOptionSquares from '../../../redux/OfflinePlay/Actions/PassPlayOptionSquare';
import updateMoveFrom from '../../../redux/OfflinePlay/Actions/PassPlayMoveFrom';
import updateMoveTo from '../../../redux/OfflinePlay/Actions/PassPlayMoveTo';
import updatePlayer from '../../../redux/OfflinePlay/Actions/PassPlayPlayer';
import updateShowPromotionDialog from '../../../redux/OfflinePlay/Actions/PassPlayPromotionDialog';
import updateOpenResultModal from '../../../redux/OfflinePlay/Actions/OpenResultModal';
import ResultModal from '../Result/ResultModal';
import updateStartTime from '../../../redux/OfflinePlay/Actions/PassPlayStartTime';
import getTimeGap from '../../../utils/getTimeGap';
import updateRotation from '../../../redux/OfflinePlay/Actions/PassPlayRotation';
import updateOrientation from '../../../redux/OfflinePlay/Actions/PassPlayOrientation';
import responsiveBoard from '../../../utils/responsiveBoard';
import normalMoveAudio from '../../../static/audio/move.mp3'
import captureMoveAudio from '../../../static/audio/capture.mp3'
import checkmateAudio from '../../../static/audio/checkmate_sound_effect.mp3'
import checkAudio from '../../../static/audio/check.mp3'
import castleAudio from '../../../static/audio/castle.mp3'

const Board = (props) => {

    const { isFullscreen, isRotationEnabled, opacity } = props;

    const moveAudioRef = useRef(new Audio(normalMoveAudio));

    const captureAudioRef = useRef(new Audio(captureMoveAudio));

    const checkmateAudioRef = useRef(new Audio(checkmateAudio));

    const castleAudioRef = useRef(new Audio(castleAudio));

    const checkAudioRef = useRef(new Audio(checkAudio));

    const game = useSelector(state => state.PassPlay.game);

    const rightClickedSquares = useSelector(state => state.PassPlay.rightClickedSquares)

    const optionSquares = useSelector(state => state.PassPlay.optionSquare)

    const moveFrom = useSelector(state => state.PassPlay.moveFrom)

    const moveTo = useSelector(state => state.PassPlay.moveTo)

    const player = useSelector(state => state.PassPlay.player)

    const showPromotionDialog = useSelector(state => state.PassPlay.showPromotionDialog)

    const moveSquares = useSelector(state => state.PassPlay.moveSquare)

    const gameEnd = useSelector(state => state.PassPlay.gameEnd)

    const startTime = useSelector(state => state.PassPlay.startTime)

    const rotate = useSelector(state => state.PassPlay.rotate)

    const orientation = useSelector(state => state.PassPlay.orientation)

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const [boardWidth, setBoardWidth] = useState(400);

    const [currentMove, setCurrentMove] = useState('');

    const [latestMove, setLatestMove] = useState('');

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

    const dispatch = useDispatch();

    if (!startTime) {
        dispatch(updateStartTime(new Date()));
    }

    function getMoveOptions(square) {
        const moves = game.moves({
            square,
            verbose: true,
        });
        if (moves.length === 0) {
            dispatch(updateOptionSquares({}));
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
        dispatch(updateOptionSquares(newSquares));
        return true;
    }

    function makeMove(from, to, promotion = "q") {
        const gameCopy = { ...game };
        const move = gameCopy.move({ from, to, promotion });
        setLatestMove(to);
        if (move) {
            const turn = (player === "w" ? "b" : "w")
            const currOrientation = (player === "w" ? "black" : "white")
            dispatch(gameSituation(gameCopy));
            dispatch(updateMoveFrom(""));
            dispatch(updateMoveTo(null));
            dispatch(updateOptionSquares({}));
            dispatch(updateShowPromotionDialog(false));
            dispatch(updatePlayer(turn));
            isRotationEnabled && dispatch(updateRotation(rotate + 180));
            isRotationEnabled && dispatch(updateOrientation(currOrientation));
            if (game.in_check()) {
                checkAudioRef.current.play().catch(error => {
                    console.error('Failed to play audio:', error);
                });
            } else if (game.history()[game.history().length - 1] === 'O-O') {
                castleAudioRef.current.play().catch(error => {
                    console.error('Failed to play audio:', error);
                });
            } else if (move.flags === 'c') {
                captureAudioRef.current.play().catch(error => {
                    console.error('Failed to play audio:', error);
                });
            } else {
                moveAudioRef.current.play().catch(error => {
                    console.error('Failed to play audio:', error);
                });
            }
        }
    }

    function onSquareClick(square) {
        dispatch(updateRightClickedSquares({}));

        if (!moveFrom) {
            const hasMoveOptions = getMoveOptions(square);
            if (hasMoveOptions && game.get(square)?.color === player) {
                dispatch(updateMoveFrom(square));
            }
        } else {
            const moves = game.moves({
                square: moveFrom,
                verbose: true,
            });
            const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

            if (foundMove) {
                dispatch(updateMoveTo(square));

                if (
                    (foundMove.color === "w" && foundMove.piece === "p" && square[1] === "8") ||
                    (foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1")
                ) {
                    dispatch(updateShowPromotionDialog(true));
                } else {
                    makeMove(moveFrom, square);
                }
            } else {
                const hasMoveOptions = getMoveOptions(square);
                if (hasMoveOptions && game.get(square)?.color === player) {
                    dispatch(updateMoveFrom(square));
                }
            }
        }
    }

    function onPromotionPieceSelect(piece) {
        makeMove(moveFrom, moveTo, piece[1].toLowerCase() ?? "q");
    }

    function onSquareRightClick(square) {
        const colour = "rgba(0, 0, 255, 0.4)";
        dispatch(updateRightClickedSquares({
            ...rightClickedSquares,
            [square]:
                rightClickedSquares[square] &&
                    rightClickedSquares[square].backgroundColor === colour
                    ? undefined
                    : { backgroundColor: colour },
        }));
    }

    const checkGameStatus = () => {
        if (game.in_checkmate()) {
            const winner = player === 'w' ? 'Black' : 'White';
            const endTime = new Date();
            const matchRuntime = getTimeGap(startTime, endTime);
            checkmateAudioRef.current.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
            dispatch(updateOpenResultModal({ end: true, data: { result: `${winner} wins by checkmate!`, history: game.history(), matchRuntime } }))
        } else if (game.in_stalemate()) {
            const endTime = new Date();
            const matchRuntime = getTimeGap(startTime, endTime);
            checkmateAudioRef.current.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
            dispatch(updateOpenResultModal({ end: true, data: { result: "The game is a draw!", history: game.history(), matchRuntime } }))
        } else if (game.in_draw()) {
            const endTime = new Date();
            const matchRuntime = getTimeGap(startTime, endTime);
            checkmateAudioRef.current.play().catch(error => {
                console.error('Failed to play audio:', error);
            });
            dispatch(updateOpenResultModal({ end: true, data: { result: "The game is a draw!", history: game.history(), matchRuntime } }))
        }
    };

    useEffect(() => {
        checkGameStatus();
    });

    useEffect(() => {
        if (game.fen() === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
            setCurrentMove('');
        } else {
            setCurrentMove({ [latestMove]: { backgroundColor: currentTheme === 'dark' ? 'white' : '#ffe74a' } });
        }
    }, [currentTheme, latestMove, game]);

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

    return (
        <>
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
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
                    transform: `rotate(${rotate}deg)`,
                    opacity: opacity,
                    transition: "opacity 0.3s ease-in-out",
                    pointerEvents: opacity <= 0.3 ? "none" : "auto",
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
                customPieces={customPieces}
                showPromotionDialog={showPromotionDialog}
                boardWidth={boardWidth}
                boardOrientation={orientation}
            />
            {gameEnd && <ResultModal isFullscreen={isFullscreen} />}
        </>
    )
}

export default Board