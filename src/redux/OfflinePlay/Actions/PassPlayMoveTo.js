import { setMoveTo } from "./ActionType/PassPlayTypes";

const updateMoveTo = (data) => {
    return {
        type: setMoveTo,
        payload: data
    }
}

export default updateMoveTo