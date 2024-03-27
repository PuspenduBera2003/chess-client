import React from 'react'

const CommentSkeleton = () => {
    return (
        <div role="status" className="p-2 w-full border border-gray-200 rounded shadow animate-pulse flex flex-col flex-wrap gap-2 dark:border-gray-700">
            <div className="flex flex-row flex-wrap gap-2">
                <div className="flex items-center">
                    <svg className="w-24 h-24 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                </div>
                <div className="p-1 sm:p-3 flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                    <div className="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-2"></div>
                </div>
            </div>
            <div className='flex flex-col gap-3 border rounded-xl text-black dark:text-gray-300 border-gray-400 dark:border-gray-500'>
                    <div className="h-24 bg-gray-200 dark:bg-gray-700 w-full rounded-lg"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default CommentSkeleton