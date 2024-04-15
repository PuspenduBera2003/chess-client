import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Win from './Types/Win';
import Lose from './Types/Lose';
import Draw from './Types/Draw';
import updateBotResultOpen from '../../../../redux/Bot/Actions/updateBotResultOpen';


export default function Result() {
    const dispatch = useDispatch();

    const open = useSelector(state => state.Bot.resultOpen)
    const result = useSelector(state => state.Bot.result)

    const handleClose = () => {
        dispatch(updateBotResultOpen(false))
    };


    return (
        <div className='absolute flex items-center justify-center top-0 w-full h-full'>
            {
                (result && open) &&
                <div className={`w-72 rounded-lg flex flex-col gap-4 items-center justify-center p-2 mb-4 text-gray-900 dark:text-yellow-300 z-40`} style={{ backgroundColor: 'rgba(0, 0, 0, .6)' }} >
                    {
                        (result === 'W') ?
                            <Win />
                            : (result === 'L') ?
                                <Lose />
                                : <Draw />
                    }
                    <button
                        onClick={handleClose}
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Dismiss
                    </button>
                </div>
            }
        </div>
    );
}