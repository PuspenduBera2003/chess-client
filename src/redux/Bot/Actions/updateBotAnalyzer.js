import { setBotAnalyzer } from "./ActionTypes/ActionsTypes";

const updateBotAnalyzer = (data) => {
    return {
        type: setBotAnalyzer,
        payload: data
    }
}

export default updateBotAnalyzer;