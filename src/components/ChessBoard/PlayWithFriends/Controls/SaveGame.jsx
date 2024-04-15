import React from 'react'

const SaveGame = () => {
    return (
        <button
            className="w-full h-full relative inline-flex items-center justify-center overflow-hidden text-sm font-medium group">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 text-gray-700 dark:text-gray-100 rounded-md group-hover:bg-opacity-0">
                Save Game
                <i className="ml-2 fa-solid fa-floppy-disk"></i>
            </span>
        </button>
    )
}

export default SaveGame
