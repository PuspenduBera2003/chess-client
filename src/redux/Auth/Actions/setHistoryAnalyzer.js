import { setHistoryAnalyzer } from "./ActionType/AuthTypes"

const updateHistoryAnalyzer = (data) => {
    return{
        type: setHistoryAnalyzer,
        payload: data
    }
}

export default updateHistoryAnalyzer