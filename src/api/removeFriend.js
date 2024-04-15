import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const removeFriend = async (sid, rid, friendList) => {
    const removeFriendURL = `${host}/api/remove-friend`;

    try {
        const response = await axios.post(removeFriendURL, { sid, rid, friendList });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default removeFriend