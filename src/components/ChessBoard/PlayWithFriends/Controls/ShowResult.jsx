import React from 'react'
import { useDispatch } from 'react-redux'
import updateResultModalOpen from '../../../../redux/MultiPlayer/Actions/updateModalOpen';

const ShowResult = () => {
    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(updateResultModalOpen(true))
    };

    return (
        <button
        onClick={handleOpen}
         className="w-full h-full relative inline-flex items-center justify-center overflow-hidden text-sm font-medium group">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-700 dark:text-gray-100 rounded-md group-hover:bg-opacity-0">
                Show Result
                <i className="ml-2 fa-solid fa-square-poll-vertical"></i>
            </span>
        </button>
    )
}

export default ShowResult