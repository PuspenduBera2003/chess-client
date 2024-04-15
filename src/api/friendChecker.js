import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const checkFriends = async (id) => {
    const showFriendURL = `${host}/api/friend-list`;

    try {
        const response = await axios.post(showFriendURL, { id });
        if (response.data.success === false)
            return false;
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default checkFriends