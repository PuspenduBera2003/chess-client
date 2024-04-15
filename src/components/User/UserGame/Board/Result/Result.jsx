import * as React from 'react';
import { useSelector } from 'react-redux'

export default function Result() {
    const gameHistory = useSelector(state => state.Auth.moveHistory);
    const gameAnalyzer = useSelector(state => state.Auth.historyAnalyzer);
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false)
    };

    const conclusion = useSelector(state => state.Auth.gameConclusion)

    React.useEffect(() => {
        if (gameHistory.length === gameAnalyzer.length)
            setOpen(true);
    }, [gameHistory, gameAnalyzer])

    return (
        <div className='absolute flex items-center justify-center top-0 w-full h-full'>
            {
                open && (
                    <div className={`w-72 rounded-lg flex flex-col gap-4 items-center justify-center p-2 mb-4 text-gray-900 dark:text-yellow-300 z-40`} style={{ backgroundColor: 'rgba(0, 0, 0, .6)' }} >
                        <div className={`uppercase text-xl font-bold text-center text-white`}>
                            {conclusion}
                        </div>
                        <div className='flex flex-row flex-wrap items-center justify-center'>
                            <button
                                onClick={handleClose}
                                type="button"
                                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                                Dismiss
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}