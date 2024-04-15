import { setBotLevel } from "./ActionTypes/ActionsTypes";

const updateBotLevel = (data) => {
    return {
        type: setBotLevel,
        payload: data
    }
}

export default updateBotLevel;