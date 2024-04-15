import { setConclusion } from "./ActionType/AuthTypes"

const updateConclusion = (data) => {
    return {
        type: setConclusion,
        payload: data
    }
}

export default updateConclusion