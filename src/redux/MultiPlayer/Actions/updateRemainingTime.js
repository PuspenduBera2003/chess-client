import { setRemainingTime } from "./ActionTypes/ActionTypes";

const updateRemainingTime = (data) => {
    return{
        type: setRemainingTime,
        payload: data
    }
}

export default updateRemainingTime;