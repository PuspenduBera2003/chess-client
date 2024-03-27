import React from 'react'
import socket from '../../../socket/socket'
// import { useSelector } from 'react-redux'

const RandomPlayButton = () => {

    // const userDetails = useSelector(state => state.Auth.userDetails);

    const handlePlayRequest = () =>{
        socket.emit("random-play")
    }

  return (
    <div className='p-8 flex items-center justify-center bg-white dark:bg-gray-700'>
      <button 
      onClick={handlePlayRequest}
      type='button' 
      className='p-2 rounded-md bg-black text-white dark:bg-white dark:text-gray-700'>
        Play With Random Player
      </button>
    </div>
  )
}

export default RandomPlayButton
