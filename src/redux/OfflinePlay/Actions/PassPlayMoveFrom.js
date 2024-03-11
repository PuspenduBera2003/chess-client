import { setMoveFrom } from "./ActionType/PassPlayTypes";

const updateMoveFrom = (data) => {
    return {
        type: setMoveFrom,
        payload: data
    }
}

export default updateMoveFrom