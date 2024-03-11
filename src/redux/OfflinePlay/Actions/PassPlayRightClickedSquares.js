import { setRightClickedSquares } from "./ActionType/PassPlayTypes";

const updateRightClickedSquares = (data) => {
    return{
        type: setRightClickedSquares,
        payload: data,
    }
}

export default updateRightClickedSquares