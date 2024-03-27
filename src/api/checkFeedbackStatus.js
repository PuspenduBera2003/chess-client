import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const checkFeedbackStatus = async (offset) => {
    const fetchFeedbackURL = `${host}/api/comment-status`;

    try {
        const response = await axios.post(fetchFeedbackURL);
        return response.data;
    } catch (error) {
        return ({ success: false, error });
    }
}

export default checkFeedbackStatus