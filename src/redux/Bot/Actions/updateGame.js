import { setGame } from "./ActionTypes/ActionsTypes";

const updateGame = (data) => {
    return {
        type: setGame,
        payload: data
    }
}

export default updateGame;