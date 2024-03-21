import { setUserFriend } from "./ActionType/AuthTypes"

const updateUserFriend = (data) => {
    return{
        type: setUserFriend,
        payload: data
    }
}

export default updateUserFriend