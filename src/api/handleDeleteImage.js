import axios from 'axios';

const host = process.env.REACT_APP_HOST_SERVER;

axios.defaults.withCredentials = true;

const handleDeleteImage = async (file) => {

    const uploadPhoto = `${host}/api/upload-or-delete-photo`;
    const credentialsURL = `${host}/api/credentials`;

    try {
        const doDeleteImage = await axios.delete(uploadPhoto);

        if (!doDeleteImage.data.success) {
            return doDeleteImage.data;
        }

        const responseFromCredentials = await axios.get(credentialsURL);
        const jsonFromAuth = responseFromCredentials.data;

        return jsonFromAuth;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export default handleDeleteImage;
