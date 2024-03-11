import { setBoardOrientation, setGame, setGameId, setGameLink, setRemainingTime } from "../Actions/ActionTypes/ActionTypes"
import Chess from "chess.js"

const game = new Chess();

const initialState = {
    remainingTime: 120,
    gameLink: '',
    gameId: '',
    game: game,
    boardOrientation: 'white'
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
        default:
            return state
    }
}

export default MultiPlayerReducer