import React from 'react'
import DrawOffer from './DrawOffer'
import Resign from './Resign'
import ToggleFullScreen from './ToggleFullScreen'
import { useSelector } from 'react-redux'
import SaveGame from './SaveGame'
import ShowResult from './ShowResult'
import BoardThemePicker from './BoardThemePicker'

const ControlsLayout = (props) => {

  const result = useSelector(state => state.MultiPlayer.gameResult)
  const userDetails = useSelector(state => state.Auth.userDetails);
  const opponentDetails = useSelector(state => state.MultiPlayer.opponentDetails);
  const gameId = useSelector(state => state.MultiPlayer.gameId);
  const atBeginning = useSelector(state => state.MultiPlayer.atBeginning)
  const playingGame = useSelector(state => state.MultiPlayer.playingGame);

  return (
    <ul className='flex flex-col gap-0 items-center justify-center min-w-12 border dark:border-gray-700'>
      {
        !atBeginning && !result.has(gameId) &&
        (
          <li className="w-full h-12 odd:bg-white odd:dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
            <DrawOffer />
          </li>
        )
      }
      {
        playingGame &&
        <li className="w-full h-12 odd:bg-white hover:bg-gray-100 dark:hover:bg-gray-700 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
          <Resign />
        </li>
      }
      <li className="w-full h-12 odd:bg-white hover:bg-gray-50 dark:hover:bg-gray-800 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
        <ToggleFullScreen data={props.data} />
      </li>
      {
        result.has(gameId) && userDetails && !opponentDetails &&
        (
          <li className="w-full h-12 odd:bg-white hover:bg-gray-100 dark:hover:bg-gray-700 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
            <SaveGame />
          </li>
        )
      }
      {
        result.has(gameId) &&
        (
          <li className="w-full h-12 odd:bg-white hover:bg-gray-50 dark:hover:bg-gray-800 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
            <ShowResult />
          </li>
        )
      }
      <li className="w-full h-12 odd:bg-white hover:bg-gray-50 dark:hover:bg-gray-800 odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border dark:border-gray-700 list-none">
        <BoardThemePicker />
      </li>
    </ul>
  )
}

export default ControlsLayout
