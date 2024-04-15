import { setAddPromoted } from "./ActionTypes/ActionTypes";

const addPromoted = (data) => {
    return {
        type: setAddPromoted,
        payload: data
    }
}

export default addPromoted;