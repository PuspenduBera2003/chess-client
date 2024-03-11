import { setGame } from "./ActionType/PassPlayTypes";

const gameSituation = (game) => {
    return{
        type: setGame,
        payload: game,
    }
}

export default gameSituation