import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const acceptFriendRequest = async (sid, rid, friendList) => {
    const acceptRequestURL = `${host}/api/accept-request`;

    try {
        const response = await axios.post(acceptRequestURL, { sid, rid, friendList });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default acceptFriendRequest