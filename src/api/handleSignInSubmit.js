import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const handleSignInSubmit = async (credentials) => {
    const signInURL = `${host}/api/login`;
    const credentialsURL = `${host}/api/credentials`;
    try {
        const doSignIn = await axios.post(signInURL, {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password
        });
        if (!doSignIn.data.success)
            return (doSignIn.data)
        const responseFromCredentials = await axios.get(credentialsURL);
        const jsonFromAuth = responseFromCredentials.data;
        return jsonFromAuth
    } catch (error) {
        return ({ success: false, error })
    }
}

export default handleSignInSubmit