import { setBotHistory } from "./ActionTypes/ActionsTypes";

const updateBotHistory = (data) => {
    return {
        type: setBotHistory,
        payload: data
    }
}

export default updateBotHistory;