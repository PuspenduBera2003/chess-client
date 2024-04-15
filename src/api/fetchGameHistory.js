import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const fetchGameHistory = async (offset) => {
    const fetchGameHistoryURL = `${host}/api/game-history-feed`;
    try {
        const response = await axios.get(fetchGameHistoryURL, {
            params: {
              offset: offset
            },
          });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default fetchGameHistory