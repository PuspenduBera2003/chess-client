import { setClearPromoted } from "./ActionTypes/ActionTypes";

const clearPromoted = (data) => {
    return {
        type: setClearPromoted,
        payload: data
    }
}

export default clearPromoted;