import { setAtBeginning } from "./ActionTypes/ActionTypes";

const updateAtBeginning = (data) => {
    return {
        type: setAtBeginning,
        payload: data
    }
}

export default updateAtBeginning;