import { setBotAnalyzer, setBotHistory, setBotLevel, setBotResult, setGame, setPosition, setResultOpen, setTurn } from "../Actions/ActionTypes/ActionsTypes"
import Chess from 'chess.js'

const game = new Chess()

const initialState = {
    botHistory: [],
    game: game,
    turn: false,
    position: game.fen(),
    analyzer: [],
    result: '',
    resultOpen: false,
    botLevel: 2
}

const BotReducer = (state = initialState, action) => {
    switch (action.type) {
        case setBotHistory:
            return {
                ...state,
                botHistory: action.payload
            }
        case setGame:
            return {
                ...state,
                game: action.payload
            }
        case setTurn:
            return {
                ...state,
                turn: action.payload
            }
        case setPosition:
            return {
                ...state,
                position: action.payload
            }
        case setBotAnalyzer:
            return {
                ...state,
                analyzer: action.payload
            }
        case setBotResult:
            return {
                ...state,
                result: action.payload
            }
        case setResultOpen:
            return {
                ...state,
                resultOpen: action.payload
            }
        case setBotLevel:
            return {
                ...state,
                botLevel: action.payload
            }
        default:
            return state
    }
}

export default BotReducer