import { setTurn } from "./ActionTypes/ActionsTypes";

const updateTurn = (data) => {
    return {
        type: setTurn,
        payload: data
    }
}

export default updateTurn;