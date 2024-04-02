import { setTurn } from "./ActionTypes/ActionTypes";

const updateTurn = (data) => {
    return {
        type: setTurn,
        payload: data
    }
}

export default updateTurn;