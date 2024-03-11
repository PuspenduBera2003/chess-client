import { setAuthenticated } from "./ActionType/AuthTypes"

const updateIsAuthenticated = (data) => {
    return{
        type: setAuthenticated,
        payload: data
    }
}

export default updateIsAuthenticated