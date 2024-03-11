import { setUserDetails } from "./ActionType/AuthTypes"

const updateUserDetails = (data) => {
    return{
        type: setUserDetails,
        payload: data
    }
}

export default updateUserDetails