import { setBoardOrientation, setGame, setGameAnalyzer, setGameHistory, setGameId, setGameLink, setGameResult, setOpponentDetails, setPieceSelection, setPlayingGame, setPosition, setRemainingTime, setRequestSender, setTurn } from "../Actions/ActionTypes/ActionTypes"
import Chess from "chess.js"

const game = new Chess();

const initialState = {
    remainingTime: 120,
    gameLink: '',
    gameId: '',
    game: game,
    boardOrientation: 'white',
    pieceSelection: '',
    requestSender: false,
    opponentDetails: null,
    turn: false,
    position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    gameHistory: [],
    gameAnalyzer: [],
    playingGame: false,
    gameResult: new Map()
}

const MultiPlayerReducer = (state = initialState, action) => {
    switch (action.type) {
        case setRemainingTime:
            return {
                ...state,
                remainingTime: action.payload
            }
        case setGameLink:
            return {
                ...state,
                gameLink: action.payload
            }
        case setGameId:
            return {
                ...state,
                gameId: action.payload
            }
        case setGame:
            return {
                ...state,
                game: action.payload
            }
        case setBoardOrientation:
            return {
                ...state,
                boardOrientation: action.payload
            }
        case setPieceSelection:
            return {
                ...state,
                pieceSelection: action.payload
            }
        case setRequestSender:
            return {
                ...state,
                requestSender: action.payload
            }
        case setOpponentDetails:
            return {
                ...state,
                opponentDetails: action.payload
            }
        case setTurn:
            return {
                ...state,
                turn: action.payload
            }
        case setGameHistory:
            return {
                ...state,
                gameHistory: action.payload
            }
        case setGameAnalyzer:
            return {
                ...state,
                gameAnalyzer: action.payload
            }
        case setPosition:
            return {
                ...state,
                position: action.payload
            }
        case setPlayingGame:
            return {
                ...state,
                playingGame: action.payload
            }
        case setGameResult:
            const { key, value } = action.payload;
            const updatedGameResult = new Map(state.gameResult);
            updatedGameResult.set(key, value);
            return {
                ...state,
                gameResult: updatedGameResult
            }

        default:
            return state
    }
}

export default MultiPlayerReducer