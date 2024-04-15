import { setPosition } from "./ActionTypes/ActionsTypes";

const updatePosition = (data) => {
    return {
        type: setPosition,
        payload: data
    }
}

export default updatePosition;