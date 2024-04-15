import { setBoardOrientation, setGame, setGameAnalyzer, setGameHistory, setGameId, setGameLink, setGameResult, setOpponentDetails, setPieceSelection, setPlayingGame, setPosition, setAddPromoted, setRemainingTime, setRequestSender, setTurn, setDeletePromoted, setAtBeginning, setClearPromoted, setModalOpen, setBoardTheme } from "../Actions/ActionTypes/ActionTypes"
import Chess from "chess.js"

const game = new Chess();

const checkTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
        return 'dark'
    } else {
        return 'light'
    }
}

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
    gameResult: new Map(),
    promoted: new Map(),
    atBeginning: true,
    resultModal: false,
    boardTheme: checkTheme(),
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
        case setAddPromoted:
            const { promotedPiece } = action.payload;
            const updatedPromoted = new Map(state.promoted);
            updatedPromoted.set(promotedPiece, true);
            return {
                ...state,
                promoted: updatedPromoted
            }
        case setClearPromoted:
            return {
                ...state,
                promoted: new Map()
            }
        case setDeletePromoted:
            const { promotedPiece: pieceToDelete } = action.payload;
            const updatedPromotedDelete = new Map(state.promoted);
            updatedPromotedDelete.delete(pieceToDelete);
            return {
                ...state,
                promoted: updatedPromotedDelete,
            };
        case setAtBeginning:
            return {
                ...state,
                atBeginning: action.payload
            }
        case setModalOpen:
            return {
                ...state,
                resultModal: action.payload
            }
        case setBoardTheme:
            return {
                ...state,
                boardTheme: action.payload
            }
        default:
            return state
    }
}

export default MultiPlayerReducer