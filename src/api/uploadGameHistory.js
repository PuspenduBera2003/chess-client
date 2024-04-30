import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const uploadGameHistory = async ( gameId, white_id, black_id, moves, message, conclusion ) => {
    const saveHistoryURL = `${host}/api/game-history-save`;
    try {
        const response = await axios.post(saveHistoryURL, { gameId, white_id, black_id, moves, message, conclusion});
        return response.data;
    } catch (error) {
        console.log('inside catch')
        return ({ success: false, error: error });
    }
}

export default uploadGameHistory