import { setNewMove } from "./ActionTypes/ActionTypes";

const updateNewMove = (data) => {
    return {
        type: setNewMove,
        payload: data
    }
}

export default updateNewMove;