import { setGameLink } from "./ActionTypes/ActionTypes";

const updateGameLink = (data) => {
    return{
        type: setGameLink,
        payload: data
    }
}

export default updateGameLink;