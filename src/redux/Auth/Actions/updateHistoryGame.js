import { setHistoryGame } from "./ActionType/AuthTypes"

const updateHistoryGame = (data) => {
    return {
        type: setHistoryGame,
        payload: data
    }
}

export default updateHistoryGame