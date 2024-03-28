import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import sadEmoji from '../../../../static/images/sad_emoji.webp'
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import socket from '../../../../socket/socket';
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';
import updateRequestSender from '../../../../redux/MultiPlayer/Actions/updateRequestSender';
import PlayMatch from '../../../User/UserSearch/Search/Buttons/PlayMatch';
import updateOpponentDetails from '../../../../redux/MultiPlayer/Actions/updateOpponentDetails';

const renderTime = ({ remainingTime, username, profilePhoto }) => {

  if (remainingTime === 0) {
    return <div className="timer">
      <img src={sadEmoji} alt="Time Out" />
    </div>;
  }

  return (
    <div className="timer">
      {
        profilePhoto ?
          <img src={profilePhoto} alt={username} className="w-20 h-20 rounded-full" />
          :
          <div className="flex items-center">
            <svg className="w-20 h-20 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </div>
      }
    </div>
  );
};

export default function SimpleBackdrop(props) {

  const { gameId } = props;

  const opponentDetails = useSelector(state => state.MultiPlayer.opponentDetails)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);
  const [timeOver, setTimeOver] = React.useState(false);
  const [key, setKey] = React.useState(0);

  const handlePlayAgainClick = () => {
    setTimeOver(false);
    setKey((prevKey) => prevKey + 1);
  }

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    socket.on("challenge-accepted", (data) => {
      handleClose();
      dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Match Started' }));
      dispatch(updateRequestSender(false));
    })
  })

  const handleCancelRequest = () => {
    dispatch(updateRequestSender(false));
    dispatch(updateOpponentDetails(null));
    socket.emit("game-request-cancelled", { rid: opponentDetails.id, room: gameId });
    handleClose();
    navigate('/user/dashboard/friends');
  }

  const handleComplete = () => {
    setTimeOver(true);
    socket.emit("game-request-cancelled", { rid: opponentDetails.id, room: gameId });
  }

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <div className='bg-white dark:bg-gray-800 rounded-lg p-5 flex flex-col gap-3 items-center justify-center'>
          <CountdownCircleTimer
            key={key}
            isPlaying
            duration={120}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[120, 60, 30, 0]}
            onComplete={handleComplete}
            size={92}
            strokeWidth={5}
          >
            {(props) => renderTime({ ...props, profilePhoto: opponentDetails.profile_photo, username: opponentDetails.profile_photo })}
          </CountdownCircleTimer>
          {
            !timeOver ?
              <div className='flex flex-col items-center justify-center gap-3'>
                <span className='text-black dark:text-white'>
                  Waiting for {opponentDetails.username} to join
                </span>
                <button
                  onClick={handleCancelRequest}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Cancel Request
                  <i className="fa-solid fa-xmark ml-2"></i>
                </button>
              </div>
              :
              <div className='flex flex-col items-center justify-center gap-3'>
                <span>
                  {opponentDetails.username} is offline!
                </span>
                <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i className="fa-solid fa-arrow-left me-3"></i>
                    Back
                  </button>
                  <div onClick={handlePlayAgainClick}>
                    <PlayMatch oid={opponentDetails.id} resend={1} />
                  </div>
                </div>
              </div>
          }
        </div>
      </Backdrop>
    </div>
  );
}
