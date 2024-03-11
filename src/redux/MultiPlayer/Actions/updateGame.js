import { setGame } from "./ActionTypes/ActionTypes";

const updateGame = (data) => {
    return{
        type: setGame,
        payload: data
    }
}

export default updateGame;