import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import FriendRequestNotification from './FriendRequestNotification';
import NewFriendNotification from './NewFriendNotification';
import NotificationSound from '../../static/audio/notification_sound.mp3'
import NewGameRequest from './NewGameRequest';
import DrawRequest from './DrawRequest';

const NotificationShower = () => {

  const notification = useSelector(state => state.Auth.notification);

  const playingGame = useSelector(state => state.MultiPlayer.playingGame);

  const audioRef = useRef(new Audio(NotificationSound));

  useEffect(() => {
    audioRef.current.play().catch(error => {
      console.error('Failed to play audio:', error);
    });
  }, [])

  return (
    <div>
      {
        notification.type === 'newFriendRequest' && <FriendRequestNotification />
      }
      {
        notification.type === 'newFriend' && <NewFriendNotification />
      }
      {
        (!playingGame && notification.type === 'newMatchRequest') && <NewGameRequest />
      }
      {
        notification.type === 'drawRequest' && <DrawRequest />
      }
    </div>
  )
}

export default NotificationShower
