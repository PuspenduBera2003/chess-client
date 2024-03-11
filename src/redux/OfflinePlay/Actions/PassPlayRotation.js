import { setRotation } from "./ActionType/PassPlayTypes";

const updateRotation = (data) => {
    return {
        type: setRotation,
        payload: data
    }
}

export default updateRotation