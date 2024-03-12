import { setPieceSelection } from "./ActionTypes/ActionTypes";

const updatePieceSelection = (data) => {
    return{
        type: setPieceSelection,
        payload: data
    }
}

export default updatePieceSelection;