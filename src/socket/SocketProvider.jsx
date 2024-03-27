import { useCallback, useEffect } from 'react'
import socket from './socket';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chess from 'chess.js';
import updateGame from '../redux/MultiPlayer/Actions/updateGame';
import updateBoardOrientaion from '../redux/MultiPlayer/Actions/updateBoardOrientation';
import updateShowNotification from '../redux/Auth/Actions/showNotification';
import updateUserFriend from '../redux/Auth/Actions/userFriend';

const SocketProvider = ({ children }) => {

    const refreshCallback = useCallback(() => {
        window.location.reload();
    }, []);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.Auth.userDetails);

    const friends = useSelector(state => state.Auth.userFriend)

    const notification = useSelector(state => state.Auth.notification)

    const gameLink = useSelector(state => state.MultiPlayer.gameLink);

    const navigate = useNavigate();

    socket.connect();

    useEffect(() => {

        if (userDetails) {
            socket.emit('logIn', { sessionID: userDetails.sessionID, id: userDetails.id });
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
            console.log(data)
        });

        socket.on("board", (data) => {
            dispatch(updateGame(new Chess(data.position)))
        });

        socket.on("board-orientation", (data) => {
            dispatch(updateBoardOrientaion(data.orientation));
        })

        socket.on("new-friend-request", (data) => {
            const updatedFriends = { ...friends, [data.sid]: 'p' };
            dispatch(updateUserFriend(updatedFriends));
            dispatch(updateShowNotification({ show: true, type: 'newFriendRequest', data: { sid: data.sid, username: data.susername, profile_photo: data.sprofile_photo } }))
        })

        socket.on("new-friend", (data) => {
            delete friends[data.sid];
            const updatedFriends = { ...friends, [data.sid]: 'f' };
            dispatch(updateUserFriend(updatedFriends));
            dispatch(updateShowNotification({ show: true, type: 'newFriend', data: { username: data.username, profile_photo: data.profile_photo } }))
        })

        socket.on("remove-request", (data) => {
            delete friends[data.sid];
            const updatedFriends = { ...friends };
            dispatch(updateUserFriend(updatedFriends));
            if (data.sid === notification.data.sid) {
                dispatch(updateShowNotification({ show: false, type: '', data: {} }))
            }
        })

        socket.on("new-match-request", (data) => {
            dispatch(updateShowNotification({ show: true, type: 'newMatchRequest', data: { id: data.sid, username: data.susername, profile_photo: data.sprofile_photo, gameLink: data.gameLink, gameId: data.gameId } }))
        })

        socket.on("game-cancelled", (data) => {
            if (data.gameId === notification.data.gameId) {
                dispatch(updateShowNotification({ show: false, type: '', data: {} }))
            }
        })

        socket.on("challenge-rejected", () => {
            navigate('/game/play-with-friends');
        })

        socket.on("random-game-id", (data) => {
            console.log(data);
        })

        return () => {
            socket.off("redirect");
            socket.off("board");
            socket.off("board-orientation");
            socket.off("search-user-result");
            socket.off("new-friend-request");
        }
    })
    return children
}

export default SocketProvider