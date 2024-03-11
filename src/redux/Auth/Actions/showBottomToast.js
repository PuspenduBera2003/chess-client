import { setShowBottomToast } from "./ActionType/AuthTypes"

const updateShowBotomToast = (data) => {
    return{
        type: setShowBottomToast,
        payload: data
    }
}

export default updateShowBotomToast