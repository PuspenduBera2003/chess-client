import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import FriendRequestNotification from './FriendRequestNotification';
import NewFriendNotification from './NewFriendNotification';
import NotificationSound from '../../static/audio/notification_sound.mp3'

const NotificationShower = () => {

  const notification = useSelector(state => state.Auth.notification);

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
    </div>
  )
}

export default NotificationShower
