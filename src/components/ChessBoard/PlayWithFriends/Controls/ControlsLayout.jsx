import React, { useEffect, useState } from 'react'
import DrawOffer from './DrawOffer'
import Resign from './Resign'
import ToggleFullScreen from './ToggleFullScreen'
import { useSelector } from 'react-redux'

const ControlsLayout = (props) => {

  const currentPosition = useSelector(state => state.MultiPlayer.position);
  const [atBeginning, setAtBeginning] = useState(true)

  useEffect(() => {
    if (currentPosition === 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1') {
      setAtBeginning(true);
    } else {
      setAtBeginning(false);
    }
  }, [currentPosition])

  return (
    <ul className='flex flex-col gap-0 items-center justify-center min-w-12 border dark:border-gray-700'>
      {
        !atBeginning &&
        (
          <li className="w-full h-12 odd:bg-white odd:dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
            <DrawOffer />
          </li>
        )
      }
      <li className="w-full h-12 odd:bg-white hover:bg-gray-100 dark:hover:bg-gray-700 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
        <Resign />
      </li>
      <li className="w-full h-12 odd:bg-white hover:bg-gray-50 dark:hover:bg-gray-800 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
        <ToggleFullScreen data={props.data} />
      </li>
    </ul>
  )
}

export default ControlsLayout
