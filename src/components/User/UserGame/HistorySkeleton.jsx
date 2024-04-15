import React from 'react'

const HistorySkeleton = () => {
    return (
        <div className='animate-pulse flex flex-col sm:flex-row flex-wrap items-center justify-center md:justify-between w-full m-2 border dark:border-gray-600 gap-3 rounded-lg shadow-md'>
            <svg className="w-24 h-24 rounded-l-sm text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <span className='bg-gray-200 dark:bg-gray-600 w-20 h-4 rounded-md'></span>
                <span className='bg-gray-200 dark:bg-gray-600 w-24 h-4 rounded-md'></span>
            </div>
            <span className='bg-gray-200 dark:bg-gray-600 w-24 h-5 rounded-md'></span>
            <div className='bg-gray-200 dark:bg-gray-600 w-16 h-16 rounded-lg' />
            <div className='hidden sm:flex flex-col gap-3 max-w-32'>
                <span className='bg-gray-200 dark:bg-gray-600 w-34 h-3 rounded-sm'></span>
                <span className='bg-gray-200 dark:bg-gray-600 w-20 h-3 rounded-sm'></span>
            </div>
            <span className='block sm:hidden bg-gray-200 dark:bg-gray-600 w-80 h-3 rounded-sm'></span>
            <div className="bg-gray-200 dark:bg-gray-600 w-28 h-9 rounded-md mr-2">
            </div>
        </div>
    )
}

export default HistorySkeleton
