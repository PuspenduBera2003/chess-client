import { setOpponentDetails } from "./ActionType/AuthTypes"

const updateOpponentDetails = (data) => {
    return {
        type: setOpponentDetails,
        payload: data
    }
}

export default updateOpponentDetails