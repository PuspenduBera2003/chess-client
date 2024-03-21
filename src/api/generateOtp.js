import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true;

const generateOTP = async (credentials) => {
    const generateOTPURL = `${host}/api/generate-otp`;

        try {
            const response = await axios.post(generateOTPURL, {
                name: credentials.name,
                username: credentials.username,
                email: credentials.email,
                password: credentials.password
            });
            return response.data;
        } catch (error) {
            return({ success: false, error});
        }
}

export default generateOTP