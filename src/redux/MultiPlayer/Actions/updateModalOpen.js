import { setModalOpen } from "./ActionTypes/ActionTypes";

const updateResultModalOpen = (data) => {
    return {
        type: setModalOpen,
        payload: data
    }
}

export default updateResultModalOpen;