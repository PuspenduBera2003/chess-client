import { setShowNotification } from "./ActionType/AuthTypes"

const updateShowNotification = (data) => {
    return {
        type: setShowNotification,
        payload: data
    }
}

export default updateShowNotification