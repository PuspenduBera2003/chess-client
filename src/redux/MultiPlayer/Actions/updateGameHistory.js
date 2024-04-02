import { setGameHistory } from "./ActionTypes/ActionTypes";

const updateGameHistory = (data) => {
    return {
        type: setGameHistory,
        payload: data
    }
}

export default updateGameHistory;