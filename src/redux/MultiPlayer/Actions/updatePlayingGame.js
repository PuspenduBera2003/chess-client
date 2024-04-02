import { setPlayingGame } from "./ActionTypes/ActionTypes";

const updatePlayingGame = (data) => {
    return {
        type: setPlayingGame,
        payload: data
    }
}

export default updatePlayingGame;