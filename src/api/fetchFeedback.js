import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const fetchFeedbacks = async (offset) => {
    const fetchDataURL = `${host}/api/comment-feed`;

    try {
        const response = await axios.post(fetchDataURL, { offset });
        return response.data;
    } catch (error) {
        return ({ success: false, error });
    }
}

export default fetchFeedbacks