import { setPlayer } from "./ActionType/PassPlayTypes";

const updatePlayer = (data) => {
    return {
        type: setPlayer,
        payload: data
    }
}

export default updatePlayer