import { setGameResult } from "./ActionTypes/ActionTypes";

const updateResult = (data) => {
    return {
        type: setGameResult,
        payload: data
    }
}

export default updateResult;