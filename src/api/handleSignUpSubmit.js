import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const handleSignUpSubmit = async (credentials, otp) => {
    const signUpURL = `${host}/api/register`;
    const credentialsURL = `${host}/api/credentials`;

        try {
            const response = await axios.post(signUpURL, {
                name: credentials.name,
                username: credentials.username,
                email: credentials.email,
                password: credentials.password,
                otp,
                token: credentials.token
            });
            if(!response.data.success) {
                return response.data
            }
            console.log("Requested for credentials")
            const responseFromCredentials = await axios.get(credentialsURL);
            console.log("Credentials request served successfully")
            const jsonFromAuth = responseFromCredentials.data;
            console.log(jsonFromAuth);
            console.log("object from sign up")
            return jsonFromAuth;
        } catch (error) {
            return({ success: false, error});
        }
}

export default handleSignUpSubmit