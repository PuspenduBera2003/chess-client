import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';
import socket from '../../../../socket/socket';
import updateGameId from '../../../../redux/MultiPlayer/Actions/updateGameId';
import Board from './Board';
import updateGameLink from '../../../../redux/MultiPlayer/Actions/updateGameLink';
import SimpleBackdrop from './Backdrop';
import SelfDetails from '../PlayerDetails/SelfDetails';
import OpponentDetails from '../PlayerDetails/OpponentDetails';
import GameHistory from '../History/GameHistory';
import MobileGameHistory from '../History/MobileGameHistory';
import ControlsLayout from '../Controls/ControlsLayout';
import updatePlayingGame from '../../../../redux/MultiPlayer/Actions/updatePlayingGame';
import updateResult from '../../../../redux/MultiPlayer/Actions/updateGameResult';
import SelfTimer from '../Timer/SelfTimer';

const PWFGameReady = (props) => {

  const currentTheme = useSelector(state => state.Theme.currentTheme);

  const userDetails = useSelector(state => state.Auth.userDetails);

  const socketId = useSelector(state => state.MultiPlayer.socketId);

  const gradientClasses = currentTheme === 'dark' ? 'dark-mode-landing-page' : 'light-mode-landing-page';

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const sender = useSelector(state => state.MultiPlayer.requestSender);

  const [linkExpired, setLinkExpired] = useState({
    expired: false, error: ''
  })

  const fullscreenDivRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  function decryptData(token) {
    try {
      const decoded = jwtDecode(token);
      return decoded.data;
    } catch (error) {
      setLinkExpired({ expired: true, error: "Invalid Link!" });
    }
  }

  const url = new URL(window.location.href);
  const pathSegments = url.pathname.split('/');
  const gameId = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const url = new URL(window.location.href);
    const pathSegments = url.pathname.split('/');
    const gameId = pathSegments[pathSegments.length - 1];
    const expiryValue = url.searchParams.get('expiry');
    const path = window.location.pathname
    if (!props.gameData) {
      dispatch(updateGameLink(path));
      if (Date.now() > decryptData(expiryValue)) {
        setLinkExpired({
          expired: true, error: "Link Expired!"
        })
      }
    }
    if (linkExpired.expired) {
      navigate('/game/play-with-friends');
      dispatch(updateShowBotomToast({ show: true, type: 'failure', message: linkExpired.error }));
      return;
    }
    socket.emit("game-created", { room: gameId, socketId, userDetails });
    socket.on("closed", () => {
      navigate('/game/play-with-friends');
      dispatch(updateShowBotomToast({ show: true, type: 'failure', message: "Game Started" }));
      return;
    })
    dispatch(updateGameId(gameId));
    return () => {
      socket.off("closed");
    }
  }, [dispatch, linkExpired.error, linkExpired.expired, socketId, navigate, props.gameData, userDetails]);

  useEffect(() => {
    const onBeforeUnload = (event) => {
      event.preventDefault();
      alert('Page is refreshing');
      dispatch(updateResult({key: gameId, value: 'Loss'}));
      event.returnValue = 'Are you sure you want to leave the page?';
    };
  
    window.addEventListener('beforeunload', onBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });
  
  useEffect(() => {
    dispatch(updatePlayingGame(true))
  }, [])

  return (
    <div className={`chessboard-layout text-gray-900 bg-gradient-to-r ${gradientClasses} p-2`} ref={fullscreenDivRef}>
      {
        sender &&
        <SimpleBackdrop gameId={gameId} />
      }
      <div className='flex flex-row items-center justify-center w-full flex-wrap gap-5 lg:gap-16'>
        <ControlsLayout data={{ fullscreenDivRef, isFullscreen, setIsFullscreen }} />
        <div className='flex flex-col gap-3'>
          <OpponentDetails />
          <Board />
          <SelfDetails />
        </div>
        <div
          className='hidden md:block overflow-y-auto overflow-x-hidden p-2 rounded-lg' style={{ maxHeight: '80vh' }}>
          <GameHistory />
        </div>
        <div className='block md:hidden overflow-x-auto rounded-lg p-2' style={{ maxWidth: '90vw' }}>
          <MobileGameHistory />
        </div>
      </div>
    </div>
  );
};

export default PWFGameReady;