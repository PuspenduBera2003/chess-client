import { setBoardTheme } from "./ActionTypes/ActionTypes";

const updateBoardTheme = (data) => {
    return {
        type: setBoardTheme,
        payload: data
    }
}

export default updateBoardTheme;