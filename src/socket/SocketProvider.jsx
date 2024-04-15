import { useCallback, useEffect } from 'react'
import socket from './socket';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Chess from 'chess.js';
import updateGame from '../redux/MultiPlayer/Actions/updateGame';
import updateBoardOrientaion from '../redux/MultiPlayer/Actions/updateBoardOrientation';
import updateShowNotification from '../redux/Auth/Actions/showNotification';
import updateUserFriend from '../redux/Auth/Actions/userFriend';
import updateShowBotomToast from '../redux/Auth/Actions/showBottomToast';
import updateOpponentDetails from '../redux/MultiPlayer/Actions/updateOpponentDetails';
import updateGameHistory from '../redux/MultiPlayer/Actions/updateGameHistory';
import updatePosition from '../redux/MultiPlayer/Actions/updatePoisition';
import updateGameAnalyzer from '../redux/MultiPlayer/Actions/updateGameAnalyzer';
import updateResult from '../redux/MultiPlayer/Actions/updateGameResult';
import deletePromoted from '../redux/MultiPlayer/Actions/updateDeletePromoted';
import addPromoted from '../redux/MultiPlayer/Actions/updateAddPromoted';
import updatePlayingGame from '../redux/MultiPlayer/Actions/updatePlayingGame';

const SocketProvider = ({ children }) => {

    const refreshCallback = useCallback(() => {
        window.location.reload();
    }, []);

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.Auth.userDetails);

    const friends = useSelector(state => state.Auth.userFriend)

    const notification = useSelector(state => state.Auth.notification)

    const gameLink = useSelector(state => state.MultiPlayer.gameLink);

    const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);

    const promoted = useSelector(state => state.MultiPlayer.promoted);

    const playingGame = useSelector(state => state.MultiPlayer.playingGame);

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
            if (userDetails && userDetails.id && data.opponentDetails && data.opponentDetails.id) {
                if (userDetails.id !== data.opponentDetails.id) {
                    sessionStorage.setItem('gameId', data.gameId);
                    navigate(gameLink);
                    dispatch(updateOpponentDetails(data.opponentDetails));
                } else {
                    return;
                }
            } else {
                navigate(gameLink);
            }
        });

        socket.on("both-joined", (data) => {
            if (userDetails && userDetails.id && data.opponentDetails && data.opponentDetails.id) {
                if (userDetails.id === data.opponentDetails.id) {
                    dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'You Cannot Play Game With Yourself' }));
                    socket.emit("game-between-same-user", { gameId: data.gameId })
                    navigate('/game/play-with-friends');
                } else {
                    dispatch(updateOpponentDetails(data.opponentDetails));
                    sessionStorage.setItem('gameId', data.gameId);
                }
            } else {
                dispatch(updateOpponentDetails(data.opponentDetails));
                sessionStorage.setItem('gameId', data.gameId);
            }
        })

        socket.on("board", (data) => {
            if (data && data.move && data.move.square && data.move.position) {
                const updatedHistory = [...gameHistory, data.move];
                dispatch(updateGameHistory(updatedHistory));
                dispatch(updateGameAnalyzer(updatedHistory));
            }
            dispatch(updatePosition(data.position));
            dispatch(updateGame(new Chess(data.position)));
            if (data.move.promoted) {
                if (promoted.has(data.move.promoted.from)) {
                    dispatch(deletePromoted({ promotedPiece: data.move.promoted.from }));
                }
                dispatch(addPromoted({ promotedPiece: data.move.promoted.to }));
            } else if (data.move.promotedCaptured) {
                dispatch(deletePromoted({ promotedPiece: data.move.promotedCaptured }));
            }
        });

        socket.on("game-cancelled", (data) => {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: data.message}));
            dispatch(updatePlayingGame(false));
            setTimeout(() => {
                navigate('/game/play-with-friends')
            }, 3000);
        })

        socket.on("opponent-resigned", (data) => {
            dispatch(updatePlayingGame(false));
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: data.message}));
            dispatch(updateResult({ key: data.gameId, value: 'OR' }));
        })

        socket.on("opponent-time-out", (data) => {
            dispatch(updatePlayingGame(false));
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: data.message}));
            dispatch(updateResult({ key: data.gameId, value: 'OT' }));
        })

        socket.on("draw-request-received", (data) => {
            dispatch(updateShowNotification({ show: true, type: 'drawRequest', data: { sender: data.sender, room: data.room } }))
        })

        socket.on("board-orientation", (data) => {
            dispatch(updateBoardOrientaion(data.orientation));
        })

        socket.on("new-friend-request", (data) => {
            const updatedFriends = { ...friends, [data.sid]: 'p' };
            dispatch(updateUserFriend(updatedFriends));
            dispatch(updateShowNotification({ show: true, type: 'newFriendRequest', data: { sid: data.sid, username: data.susername, profile_photo: data.sprofile_photo } }))
        })

        socket.on("game-drawn", (data) => {
            dispatch(updateResult({ key: data.gameId, value: 'MA' }));
            dispatch(updatePlayingGame(false));
        })

        socket.on("draw-rejected", () => {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Opponent Rejected Your Draw Request' }));
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
            dispatch(updatePlayingGame(false));
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Your Friend Rejected Your Request' }))
            navigate('/user/dashboard/friends');
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