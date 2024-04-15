import { setHistoryBoardOrientation } from "./ActionType/AuthTypes"

const updateHistoryBoardOrientation = (data) => {
    return{
        type: setHistoryBoardOrientation,
        payload: data
    }
}

export default updateHistoryBoardOrientation