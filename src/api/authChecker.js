import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const authChecker = async () => {
    const credentialsURL = `${host}/api/credentials`;
        try {
            const responseFromCredentials = await axios.get(credentialsURL);
            const jsonFromAuth = responseFromCredentials.data;
            return(jsonFromAuth)
        } catch (error) {
            return({ success: false, error});
        }
}

const getUserDetails = async (credentials, otp) => {
    const credentialsURL = `${host}/api/credentials`;

        try {
            const responseFromCredentials = await axios.get(credentialsURL);
            const jsonFromAuth = responseFromCredentials.data;
            return(jsonFromAuth)
        } catch (error) {
            return({ success: false, error});
        }
}

export { authChecker, getUserDetails}