import { setRequestSender } from "./ActionTypes/ActionTypes";

const updateRequestSender = (data) => {
    return {
        type: setRequestSender,
        payload: data
    }
}

export default updateRequestSender;