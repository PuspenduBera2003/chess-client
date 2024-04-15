import axios from 'axios';

const host = process.env.REACT_APP_HOST_SERVER;

axios.defaults.withCredentials = true;

const handleUploadImage = async (file) => {

    if (!(file instanceof File) || !file.size) {
        return { success: false, error: 'Invalid file object' };
    }

    const uploadPhoto = `${host}/api/upload-or-delete-photo`;
    const credentialsURL = `${host}/api/credentials`;

    try {
        const formData = new FormData();
        formData.append('profileImage', file);

        const doUploadImage = await axios.post(uploadPhoto, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (!doUploadImage.data.success) {
            return doUploadImage.data;
        }

        const responseFromCredentials = await axios.get(credentialsURL);
        const jsonFromAuth = responseFromCredentials.data;

        return jsonFromAuth;
    } catch (error) {
        return { success: false, error: error.message };
    }
};

export default handleUploadImage;
