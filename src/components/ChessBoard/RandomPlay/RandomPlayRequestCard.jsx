import React, { useState } from 'react'
import socket from '../../../socket/socket'
import randomPlayImage from '../../../static/images/random.png'
import RandomPlayWaitingCard from './RandomPlayWaitingCard'

const RandomPlayRequestCard = () => {

    const [requestSend, setRequestSend] = useState(false)

    const handlePlayRequest = () => {
        socket.emit("random-play")
        setRequestSend(true);
    }

    return (
        <>
            {
                !requestSend ?
                    (
                        <div className="bg-indigo-50 flex flex-row flex-wrap gap-2 items-center justify-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-2">
                            <img className="rounded-t-lg w-72 h-72" src={randomPlayImage} alt="Random Play" />
                            <div className="p-5 flex flex-col gap-2">
                                <h5 className="mb-2 text-2xl font-bold text-center tracking-tight text-gray-900 dark:text-white">
                                    Play with random players
                                </h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
                                    You can play with random players available in our website.
                                </p>
                                <div className='flex items-center justify-center'>
                                    <button
                                        onClick={handlePlayRequest}
                                        className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                            Play Random Match
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    (
                        <RandomPlayWaitingCard setRequestSend={setRequestSend} />
                    )
            }
        </>
    )
}

export default RandomPlayRequestCard