import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import Chess from 'chess.js'
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
import Result from '../Result/Result';
import updateGameAnalyzer from '../../../../redux/MultiPlayer/Actions/updateGameAnalyzer';
import updateGameHistory from '../../../../redux/MultiPlayer/Actions/updateGameHistory';
import updateAtBeginning from '../../../../redux/MultiPlayer/Actions/updateAtBeginning';
import clearPromoted from '../../../../redux/MultiPlayer/Actions/updateClearPromoted';
import Controls from '../History/Controls';
import updateResultModalOpen from '../../../../redux/MultiPlayer/Actions/updateModalOpen';
import updateGame from '../../../../redux/MultiPlayer/Actions/updateGame';
import updatePosition from '../../../../redux/MultiPlayer/Actions/updatePoisition';
import ResultBoard from '../Result/ResultBoard';
import MobileControls from '../History/MobileControls';
import MobileControlsMenu from '../Controls/MobileControlsMenu';
import checkmateAudio from '../../../../static/audio/checkmate_sound_effect.mp3'
import gameStartedAudio from '../../../../static/audio/game-start.mp3'

const PWFGameReady = (props) => {

  const checkmateAudioRef = useRef(new Audio(checkmateAudio));

  const gameStartedAudioRef = useRef(new Audio(gameStartedAudio));

  const currentTheme = useSelector(state => state.Theme.currentTheme);

  const userDetails = useSelector(state => state.Auth.userDetails);

  const socketId = useSelector(state => state.MultiPlayer.socketId);

  const playingGame = useSelector(state => state.MultiPlayer.playingGame);

  const gameHistory = useSelector(state => state.MultiPlayer.gameHistory);

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
  }, [dispatch, linkExpired.error, linkExpired.expired, socketId, navigate, props.gameData, userDetails]);

  useEffect(() => {

    const onBeforeUnload = (event) => {
      if (playingGame) {
        event.preventDefault();
        socket.disconnect();
        dispatch(updateResult({ key: gameId, value: 'Loss' }));
        event.returnValue = 'Are you sure you want to leave the page?';
      }
    };

    window.addEventListener('beforeunload', onBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  });

  useEffect(() => {
    dispatch(updatePlayingGame(true));
    const updatedHistory = [];
    dispatch(updateGameHistory(updatedHistory));
    dispatch(updateGameAnalyzer(updatedHistory));
    dispatch(updateAtBeginning(true));
    dispatch(clearPromoted());
    dispatch(updateResultModalOpen(false));
    gameStartedAudioRef.current.play().catch(error => {
      console.error('Failed to play audio:', error);
    });
  }, [])

  const game = useSelector(state => state.MultiPlayer.game);
  const open = useSelector(state => state.MultiPlayer.resultModal)
  const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);
  const oppositionPlayer = (boardOrientation === 'white') ? 'b' : 'w';

  useEffect(() => {
    if (game.in_checkmate()) {
      if ((game.turn() === 'w' && oppositionPlayer === 'w') || (game.turn() === 'b' && oppositionPlayer === 'b')) {
        dispatch(updateResult({ key: gameId, value: 'W' }));
      } else {
        dispatch(updateResult({ key: gameId, value: 'L' }));
      }
      dispatch(updatePlayingGame(false));
      socket.emit("gameConcluded", { room: gameId })
    } else if (game.in_stalemate()) {
      dispatch(updateResult({ key: gameId, value: 'SD' }));
      dispatch(updatePlayingGame(false));
      socket.emit("gameConcluded", { room: gameId })
    } else if (game.in_draw()) {
      dispatch(updateResult({ key: gameId, value: 'D' }));
      dispatch(updatePlayingGame(false));
      socket.emit("gameConcluded", { room: gameId })
    }
  }, [game, gameId, oppositionPlayer, dispatch]);

  useEffect(() => {
    // Cleanup function to reset chess instance when component unmounts
    return () => {
      const newGame = new Chess();
      dispatch(updateGame(newGame));
      dispatch(updatePosition('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'));
    };
  }, [dispatch]);

  const result = useSelector(state => state.MultiPlayer.gameResult);

  useEffect(() => {
    if (result.has(gameId)) {
      dispatch(updateResultModalOpen(true));
      checkmateAudioRef.current.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
  }, [result, gameId])

  return (
    <div className={`chessboard-layout text-gray-900 bg-gradient-to-r ${gradientClasses} p-2`} ref={fullscreenDivRef}>
      {
        sender &&
        <SimpleBackdrop gameId={gameId} />
      }
      <div className='flex flex-col md:flex-row items-center justify-center w-full flex-wrap gap-2 md:gap-6 lg:gap-16'>
        <div className='hidden md:block'>
          <ControlsLayout data={{ fullscreenDivRef, isFullscreen, setIsFullscreen }} />
        </div>
        <div className={`flex-col gap-3`}>
          <OpponentDetails />
          <div className={`${open ? 'hidden' : 'block'}`}>
            <Board />
          </div>
          <div className={`${open ? 'block' : 'hidden'} relative`}>
            <ResultBoard />
            <Result />
          </div>
          <SelfDetails />
        </div>
        <div
          className='hidden md:flex items-center justify-center overflow-y-auto overflow-x-hidden p-2 rounded-lg relative' style={{ height: '80vh' }}>
          <GameHistory />
          <Controls />
        </div>
        <div className='relative block md:hidden mt-3' style={{ right: '35vw' }}>
          <MobileControlsMenu data={{ fullscreenDivRef, isFullscreen, setIsFullscreen }} />
        </div>
        {
          gameHistory.length &&
          <div className='flex flex-col items-center justify-center gap-4 md:hidden overflow-x-auto rounded-lg p-2' style={{ maxWidth: '90vw' }}>
            <MobileGameHistory />
          </div>
        }
        {
          gameHistory.length > 1 &&
          <div className='flex md:hidden'>
            <div style={{ flexGrow: 1, flexBasis: 0 }}>
              <MobileControls />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default PWFGameReady;