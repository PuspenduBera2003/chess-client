import React, { useEffect } from 'react'
import GameHistoryInterface from './GameHistoryInterface'
import HistoryBoardUI from './Board/HistoryBoardUI'
import { useDispatch, useSelector } from 'react-redux'
import updateShowHistoryBoard from '../../../redux/Auth/Actions/showHistoryBoard'
import updateMoveHistory from '../../../redux/Auth/Actions/updateMoveHistory'
import updateHistoryGame from '../../../redux/Auth/Actions/updateHistoryGame'

const UserGamePanel = () => {
    const dispatch = useDispatch();

    const showHistoryBoard = useSelector(state => state.Auth.showHistoryBoard);

    useEffect(() => {
        dispatch(updateShowHistoryBoard(false));
        dispatch(updateMoveHistory(null));
        dispatch(updateHistoryGame(null));
    }, [])

    return (
        <div className='w-full' style={{marginRight: '2.5rem'}}>
            {
                !showHistoryBoard ?
                    <GameHistoryInterface />
                    : <HistoryBoardUI />
            }
        </div>
    )
}

export default UserGamePanel
