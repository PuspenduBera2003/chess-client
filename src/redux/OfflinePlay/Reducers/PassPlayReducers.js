import { setGame, setGameEnded, setMoveFrom, setMoveSquare, setMoveTo, setOptionSquares, setOrientation, setPlayer, setRightClickedSquares, setRotation, setShowPromotionDialog, setStartTime } from '../Actions/ActionType/PassPlayTypes'
import Chess from "chess.js";

const initialState = {
    game: new Chess(),
    rightClickedSquares: {},
    optionSquare: {},
    moveFrom: "",
    moveTo: null,
    player: 'w',
    showPromotionDialog: false,
    moveSquare: {},
    gameEnd: false,
    modalData: {},
    startTime: "",
    rotate: 0,
    orientation: 'white'
}

const PassPlayReducer = (state = initialState, action) => {
    switch (action.type) {
        case setGame:
            return {
                ...state,
                game: action.payload
            }
        case setRightClickedSquares:
            return {
                ...state,
                rightClickedSquares: action.payload
            }
        case setOptionSquares:
            return {
                ...state,
                optionSquare: action.payload
            }
        case setMoveFrom:
            return {
                ...state,
                moveFrom: action.payload
            }
        case setMoveTo:
            return {
                ...state,
                moveTo: action.payload
            }
        case setPlayer:
            return {
                ...state,
                player: action.payload
            }
        case setShowPromotionDialog:
            return {
                ...state,
                showPromotionDialog: action.payload
            }
        case setMoveSquare: 
            return {
                ...state,
                moveSquare: action.payload
            }
        case setGameEnded:
            return {
                ...state,
                gameEnd: action.payload.end,
                modalData: action.payload.data
            }
        case setStartTime:
            return {
                ...state,
                startTime: action.payload
            }
        case setRotation:
            return {
                ...state,
                rotate: action.payload
            }
        case setOrientation:
            return {
                ...state,
                orientation: action.payload
            }
        default:
            return state
    }
}

export default PassPlayReducer