import { setMoveHistory } from "./ActionType/AuthTypes"

const updateMoveHistory = (data) => {
    return {
        type: setMoveHistory,
        payload: data
    }
}

export default updateMoveHistory