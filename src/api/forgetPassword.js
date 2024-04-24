import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const sendOTP = async (email) => {
    const sendOTPURL = `${host}/api/generate-forgot-otp`;

    try {
        const response = await axios.post(sendOTPURL, { email });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

const checkOTP = async (email, token, otp) => {
    const checkOTPURL = `${host}/api/check-otp`;
    try {
        const response = await axios.post(checkOTPURL, { email, token, otp });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

const setNewPw = async (email, token, otp, password) => {
    const setNewPwURL = `${host}/api/set-password`;
    try {
        const response = await axios.post(setNewPwURL, { email, token, otp, password });
        return response.data;
    } catch (error) {
        return ({ success: false, error: error.message });
    }
}

export { sendOTP, checkOTP, setNewPw }