import React from 'react'

const MobileHistorySkeleton = () => {
    return (
        <div className='animate-pulse flex flex-row items-center justify-between w-full m-2 border dark:border-gray-500 rounded-lg shadow-md'>
            <svg className="w-32 h-32 md:w-48 md:h-48 rounded-l-lg text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <div className='flex flex-wrap items-center justify-center gap-2 p-1'>
                <div className='w-20 h-20 md:w-32 md:h-32 bg-gray-200 dark:bg-gray-600 rounded-lg' ></div>
                <div className="w-16 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg">
                </div>
            </div>
        </div>
    )
}

export default MobileHistorySkeleton
