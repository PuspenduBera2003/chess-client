import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import updateShowBotomToast from '../../redux/Auth/Actions/showBottomToast';
import { ClipLoader } from 'react-spinners'

const BottomToast = () => {

    const showBottomToast = useSelector(state => state.Auth.showBottomToast);

    const theme = useSelector(state => state.Theme.currentTheme);

    const dispatch = useDispatch();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(updateShowBotomToast({ show: false, type: '', message: '' }));
        }, 3000);
        return () => clearTimeout(timeoutId);
    }, [dispatch]);

    const handleCloseClick = () => {
        dispatch(updateShowBotomToast({ show: false, type: '', message: '' }));
    }

    return (
        <div className="flex items-center w-full max-w-xs p-4 text-gray-800 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-2 right-2 z-40" role="alert">
            {
                showBottomToast.type === "success" &&
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                </div>
            }
            {
                showBottomToast.type === "failure" &&
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                    </svg>
                    <span className="sr-only">Error icon</span>
                </div>
            }
            {
                showBottomToast.type === "warning" &&
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-yellow-800 rounded-lg bg-yellow-100 dark:text-yellow-300">
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info icon</span>
                </div>
            }
            {
                showBottomToast.type === "loading" &&
                <ClipLoader color={`${theme === "dark" ? "#b4b8b5" : "#111211"}`} size={25} />
            }
            <div className="ms-3 text-sm font-normal">
                {showBottomToast.message}
            </div>
            <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" onClick={handleCloseClick} aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    )
}

export default BottomToast
