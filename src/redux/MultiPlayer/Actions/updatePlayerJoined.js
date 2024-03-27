import { setPlayerJoined } from "./ActionTypes/ActionTypes";

const updatePlayerJoined = (data) => {
    return {
        type: setPlayerJoined,
        payload: data
    }
}

export default updatePlayerJoined;