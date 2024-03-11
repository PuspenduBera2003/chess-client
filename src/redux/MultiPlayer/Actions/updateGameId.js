import { setGameId } from "./ActionTypes/ActionTypes";

const updateGameId = (data) => {
    return{
        type: setGameId,
        payload: data
    }
}

export default updateGameId;