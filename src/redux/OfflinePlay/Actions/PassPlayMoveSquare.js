import { setMoveSquare } from "./ActionType/PassPlayTypes";

const updateMoveSquare = (data) => {
    return {
        type: setMoveSquare,
        payload: data
    }
}

export default updateMoveSquare