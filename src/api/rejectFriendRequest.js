import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const rejectFriendRequest = async (sid, rid, friendList) => {
    const rejectRequestURL = `${host}/api/reject-request`;

    try {
        const response = await axios.post(rejectRequestURL, { sid, rid, friendList });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export default rejectFriendRequest