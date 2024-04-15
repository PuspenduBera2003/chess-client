import { setHistoryBoard } from "./ActionType/AuthTypes";

const updateShowHistoryBoard = (data) => {
    return {
        type: setHistoryBoard,
        payload: data
    }
}

export default updateShowHistoryBoard;