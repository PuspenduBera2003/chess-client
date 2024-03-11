import { setStartTime } from "./ActionType/PassPlayTypes";

const updateStartTime = (date) => {
    return {
        type: setStartTime,
        payload: date
    }
}

export default updateStartTime