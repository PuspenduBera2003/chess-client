import { io } from 'socket.io-client';

const URL = process.env.REACT_APP_HOST_SERVER;

const socket = io.connect(URL);

export default socket;