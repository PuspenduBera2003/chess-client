import { setResultOpen } from "./ActionTypes/ActionsTypes";

const updateBotResultOpen = (data) => {
    return {
        type: setResultOpen,
        payload: data
    }
}

export default updateBotResultOpen;