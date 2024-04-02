import { setPosition } from "./ActionTypes/ActionTypes";

const updatePosition = (data) => {
    return {
        type: setPosition,
        payload: data
    }
}

export default updatePosition;