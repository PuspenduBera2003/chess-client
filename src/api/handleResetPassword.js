import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

const handleResetPassword = async (oldPassword, newPassword) => {
    const resetPasswordURL = `${host}/api/reset-password`;

    try {
        const responseFromServer = await axios.post(resetPasswordURL, { oldPassword, newPassword });
        const jsonFromAuth = responseFromServer.data;
        if (!jsonFromAuth.success)
            return ({ success: false, error: jsonFromAuth.error });
        return jsonFromAuth
    } catch (error) {
        return ({ success: false, error: error.message })
    }
}

export default handleResetPassword