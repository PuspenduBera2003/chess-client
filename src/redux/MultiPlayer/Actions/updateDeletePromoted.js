import { setDeletePromoted } from "./ActionTypes/ActionTypes";

const deletePromoted = (data) => {
    return {
        type: setDeletePromoted,
        payload: data
    }
}

export default deletePromoted;