import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const unsendFriendRequest = async (sid, rid, friendList) => {
    const unsendRequestURL = `${host}/api/unsend-request`;

    try {
        const response = await axios.post(unsendRequestURL, { sid, rid, friendList });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default unsendFriendRequest