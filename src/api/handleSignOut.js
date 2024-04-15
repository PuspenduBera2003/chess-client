import axios from 'axios'
const host = process.env.REACT_APP_HOST_SERVER

axios.defaults.withCredentials = true

const handleSignOut = async () => {
    const signOutURL = `${host}/api/logout`;

    try {
      const response = await axios.post(signOutURL);
      return response.data;
    } catch (error) {
      return ({success: false, error: error.message});
    }
}

export default handleSignOut