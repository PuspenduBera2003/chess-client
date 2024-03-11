import { useCallback, useEffect } from 'react'
import socket from './socket';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chess from 'chess.js';
import updateGame from '../redux/MultiPlayer/Actions/updateGame';
import updateBoardOrientaion from '../redux/MultiPlayer/Actions/updateBoardOrientation';

const SocketProvider = ({ children }) => {

    const refreshCallback = useCallback(() => {
        window.location.reload();
    }, []);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.Auth.userDetails);

    const gameLink = useSelector(state => state.MultiPlayer.gameLink);

    const navigate = useNavigate();

    socket.connect();

    useEffect(() => {

        if (userDetails) {
            socket.emit('logIn', { sessionID: userDetails.sessionID });
        }

        const handleAuthCheck = () => {
            refreshCallback();
        };

        socket.on("log-out", handleAuthCheck);

        return () => {
            socket.off("log-out", handleAuthCheck);
            socket.off("redirect", () => {
                navigate(gameLink);
            });
        };

    }, [refreshCallback, gameLink, userDetails, navigate]);


    useEffect(() => {

        socket.on("redirect", (data) => {
            navigate(gameLink);
        });

        socket.on("board", (data) => {
            // dispatch(updateBoardPosition(data.position));
            dispatch(updateGame(new Chess(data.position)))
        });

        socket.on("board-orientation", (data) => {
            console.log(data)
            dispatch(updateBoardOrientaion(data.orientation));
        })
    })
    return children
}

export default SocketProvider