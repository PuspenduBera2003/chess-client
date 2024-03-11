import { setSignUpInitialized } from "./ActionType/AuthTypes"

const updateSignUpInitialized = (data) => {
    return{
        type: setSignUpInitialized,
        payload: data
    }
}

export default updateSignUpInitialized