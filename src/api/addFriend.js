import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const addFriend = async (sid, rid, sid_email, friendList) => {
    const addFriendURL = `${host}/api/add-friend`;

    try {
        const response = await axios.post(addFriendURL, { sid, rid, sid_email, friendList });
        return response.data;
    } catch (error) {
        return ({ success: false, error });
    }
}

export default addFriend