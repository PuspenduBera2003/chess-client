import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

const handleGenerateLink = async () => {
    const generateLinkURL = `${host}/api/generate-game-id`;

    try {
        const responseFromCredentials = await axios.get(generateLinkURL);
        const jsonFromAuth = responseFromCredentials.data;
        if (!jsonFromAuth.success)
            return ({ success: false, error: "Unable to Generate Link" });
        return jsonFromAuth
    } catch (error) {
        return ({ success: false, error })
    }
}

export default handleGenerateLink