import { setOrientation } from "./ActionType/PassPlayTypes";

const updateOrientation = (data) => {
    return {
        type: setOrientation,
        payload: data
    }
}

export default updateOrientation