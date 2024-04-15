import { setBotResult } from "./ActionTypes/ActionsTypes";

const updateBotResult = (data) => {
    return {
        type: setBotResult,
        payload: data
    }
}

export default updateBotResult;