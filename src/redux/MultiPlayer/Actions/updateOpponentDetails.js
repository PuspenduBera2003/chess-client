import { setOpponentDetails } from "./ActionTypes/ActionTypes";

const updateOpponentDetails = (data) => {
    return {
        type: setOpponentDetails,
        payload: data
    }
}

export default updateOpponentDetails;