import { setGameEnded } from "./ActionType/PassPlayTypes";

const updateGameEnded = (data) => {
    return {
        type: setGameEnded,
        payload: data
    }
}

export default updateGameEnded