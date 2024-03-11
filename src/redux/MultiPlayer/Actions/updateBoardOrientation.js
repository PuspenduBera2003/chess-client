import { setBoardOrientation } from "./ActionTypes/ActionTypes";

const updateBoardOrientaion = (data) => {
    return{
        type: setBoardOrientation,
        payload: data
    }
}

export default updateBoardOrientaion;