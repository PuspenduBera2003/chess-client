import React, { useState } from 'react';
import TimerCard from './TimerCard';
import { useSelector, useDispatch } from 'react-redux'
import updateRemainingTime from '../../../redux/MultiPlayer/Actions/updateRemainingTime';

const URLCard = (props) => {
    const { url, setLinkGenerated } = props;

    const [showTick, setShowTick] = useState(false);

    const dispatch = useDispatch();

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(url);
            showTooltip('Copied!');
            setShowTick(true);
        } catch (err) {
            console.error('Unable to copy to clipboard', err);
        }
    };

    const showTooltip = (message) => {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = message;
        tooltip.classList.toggle('invisible', false);
        setTimeout(() => {
            tooltip.classList.add('invisible');
            setShowTick(false);
        }, 2000);
    };

    const remainingTime = useSelector(state => state.MultiPlayer.remainingTime);

    const backClick = () => {
        setLinkGenerated(false)
        dispatch(updateRemainingTime(120));
    }

    return (
        <div className='flex items-center justify-center flex-col pt-3'>
            <TimerCard />
            {
                remainingTime ?
                    <div className="flex items-center pt-4">
                        <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600">
                            URL
                        </span>
                        <div className="relative w-full">
                            <input
                                type="text"
                                aria-describedby="helper-text-explanation"
                                className="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400 text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={url}
                                readOnly
                                disabled
                            />
                        </div>
                        <button
                            className="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700"
                            type="button"
                            onClick={handleCopyClick}
                        >
                            {
                                !showTick ?
                                    <span>
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                            <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                        </svg>
                                    </span>
                                    :
                                    <span className="inline-flex items-center">
                                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                        </svg>
                                    </span>
                            }
                        </button>
                        <div
                            id="tooltip"
                            role="tooltip"
                            className="absolute bottom-2 right-2 z-50 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm invisible dark:bg-gray-700"
                        >
                            <span>Copy link</span>
                        </div>
                    </div>
                    :
                    <div className='flex mt-4'>
                        <button
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={backClick}
                        >
                            Back to Previous Page
                        </button>
                    </div>
            }
        </div>
    );
};

export default URLCard;