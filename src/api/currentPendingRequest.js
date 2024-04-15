import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const currentPendingRequest = async (id) => {
    const addFriendURL = `${host}/api/pending-data`;

    try {
        const response = await axios.post(addFriendURL, { id });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default currentPendingRequest