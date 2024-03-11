import { setOptionSquares } from "./ActionType/PassPlayTypes";

const updateOptionSquares = (data) => {
    return {
        type: setOptionSquares,
        payload: data
    }
}

export default updateOptionSquares