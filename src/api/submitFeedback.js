import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const submitFeedback = async (rating, comment) => {
    const submitFeedbackURL = `${host}/api/comment-submit`;
    try {
        const response = await axios.post(submitFeedbackURL, { rating, comment });
        return response.data;
    } catch (error) {
        return ({ success: false, error });
    }
}

const updateFeedback = async (rating, comment) => {
    const updateFeedbackURL = `${host}/api/comment-update`;
    try {
        const response = await axios.put(updateFeedbackURL, { rating, comment });
        return response.data;
    } catch (error) {
        return ({ success: false, error });
    }
}

export { submitFeedback, updateFeedback }