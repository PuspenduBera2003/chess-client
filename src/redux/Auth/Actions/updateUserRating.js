import { setUserRating } from "./ActionType/AuthTypes"

const updateUserRating = (data) => {
    return {
        type: setUserRating,
        payload: data
    }
}

export default updateUserRating