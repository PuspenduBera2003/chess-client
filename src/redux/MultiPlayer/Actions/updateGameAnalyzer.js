import { setGameAnalyzer } from "./ActionTypes/ActionTypes";

const updateGameAnalyzer = (data) => {
    return {
        type: setGameAnalyzer,
        payload: data
    }
}

export default updateGameAnalyzer;