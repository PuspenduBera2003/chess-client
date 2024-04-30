import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import updateResultModalOpen from '../../../../redux/MultiPlayer/Actions/updateModalOpen';
import Win from './Types/Win';
import Lose from './Types/Lose';
import Draw from './Types/Draw';
import { useNavigate } from 'react-router-dom';
import ResultUploader from './ResultUploader';
import NotConcluded from './Types/NotConcluded';
import socket from '../../../../socket/socket';
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';


export default function Result() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [backgroundColor, setBackgroundColor] = React.useState('rgba(0, 0, 0, .6)')

    const open = useSelector(state => state.MultiPlayer.resultModal)
    const handleClose = () => {
        dispatch(updateResultModalOpen(false))
    };

    const gameId = useSelector(state => state.MultiPlayer.gameId);
    const result = useSelector(state => state.MultiPlayer.gameResult);
    const boardOrientation = useSelector(state => state.MultiPlayer.boardOrientation);
    const [uploader, setUploader] = React.useState(false)

    React.useEffect(() => {
        if (boardOrientation === 'white') {
            setBackgroundColor('rgba(0, 0, 0, .6)');
        } else {
            setBackgroundColor('rgba(255, 255, 255, 0.3)')
        }
    }, [boardOrientation])

    React.useEffect(() => {
        if (result.has(gameId)) {
            setUploader(true);
        }
    }, [result, gameId])

    React.useEffect(() => {
        socket.on('reconnect_attempt', (attemptNumber) => {
            dispatch(updateShowBotomToast({ show: true, type: 'loading', message: `Attempting to reconnect (attempt ${attemptNumber})` }))
        });

        socket.on('reconnect_error', (error) => {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: `Reconnection error:${error.message}` }))
        });

        socket.on('disconnect', () => {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: `Disconnected from server` }))
        });
    })

    return (
        <div className='absolute flex items-center justify-center top-0 w-full h-full'>
            {
                (result.has(gameId) && open) &&
                <div className={`w-72 rounded-lg flex flex-col gap-4 items-center justify-center p-2 mb-4 text-gray-900 dark:text-yellow-300 z-40`} style={{ backgroundColor: backgroundColor }} >
                    {
                        (result.get(gameId) === 'W' || result.get(gameId) === 'OR' || result.get(gameId) === 'OT') ?
                            <Win />
                            : (result.get(gameId) === 'L' || result.get(gameId) === 'R' || result.get(gameId) === 'T') ?
                                <Lose />
                                : (result.get(gameId) === 'MA' || result.get(gameId) === 'SD' || result.get(gameId) === 'D') ?
                                    <Draw />
                                    : <NotConcluded />
                    }
                    <div className='flex flex-row flex-wrap items-center justify-center'>
                        <button
                            onClick={handleClose}
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            Dismiss
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                            <i className="fa-solid fa-house"></i>
                        </button>
                    </div>
                </div>
            }
            {
                uploader && <ResultUploader />
            }
        </div>
    );
}