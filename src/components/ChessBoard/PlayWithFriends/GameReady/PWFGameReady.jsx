import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';
import socket from '../../../../socket/socket';
import updateGameId from '../../../../redux/MultiPlayer/Actions/updateGameId';
import Board from './Board';

const PWFGameReady = () => {

  const currentTheme = useSelector(state => state.Theme.currentTheme);

  const socketId = useSelector(state => state.MultiPlayer.socketId);

  const gradientClasses = currentTheme === 'dark' ? 'dark-mode-landing-page' : 'light-mode-landing-page';

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [linkExpired, setLinkExpired] = useState({
    expired: false, error: ''
  })

  function decryptData(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.data;
    } catch (error) {
      setLinkExpired({ expired: true, error: "Invalid Link!" });
    }
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    const gameId = pathSegments[pathSegments.length - 1];
    const expiryValue = url.searchParams.get('expiry');
    if (Date.now() > decryptData(expiryValue)) {
      setLinkExpired({
        expired: true, error: "Link Expired!"
      })
    }
    if (linkExpired.expired) {
      navigate('/game/play-with-friends');
      dispatch(updateShowBotomToast({ show: true, type: 'failure', message: linkExpired.error }));
      return;
    }
    socket.emit("game-created", { room: gameId, socketId });
    socket.on("closed", () => {
      navigate('/game/play-with-friends');
    })
    dispatch(updateGameId(gameId));
    return () => {
      socket.off("closed");
    }
  }, [dispatch, linkExpired.error, linkExpired.expired, socketId, navigate]);

  return (
    <div className={`chessboard-layout text-gray-900 bg-gradient-to-r ${gradientClasses} py-2`}>
      <Board />
    </div>
  );
};

export default PWFGameReady;