import React, { useEffect, useState } from 'react'
import SearchResult from './SearchResult'
import socket from '../../../../socket/socket';
import noDataFound from '../../../../static/images/no_data_found.png'

const Search = () => {

    const [searchResult, setSearchResult] = useState(null)

    const [searchResultLength, setSearchResultLength] = useState({
        response: false,
        length: 0
    })

    const fetchResult = (e) => {
        const trimmedValue = e.target.value.trim();
        if (!trimmedValue) {
            setSearchResultLength({ response: false, length: 0 });
            setSearchResult(null);
            return;
        }
        socket.emit("search-user", { query: trimmedValue })
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {
        socket.on("search-user-result", async (data) => {
            if (!data.result) {
                setSearchResult(null);
                return;
            }
            setSearchResult(data.result);
            setSearchResultLength({ response: true, length: data.result.length })
        })
    })

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <form className='search-bar' onSubmit={onSubmit}>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                    Search User
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        onChange={fetchResult}
                        type="search" id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user by username" required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Search
                    </button>
                </div>
            </form>
            <div className='my-3 w-full flex items-center justify-center'>
                {
                    searchResultLength.response && (
                        !searchResultLength.length ? (
                            <div className="flex flex-wrap items-center justify-center p-4 mb-4 text-sm text-red-800 border shadow-md dark:shadow-gray-600 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300 dark:border-gray-300" role="alert">
                                <img className='w-32' src={noDataFound} alt="No Result Found" />
                                <div>
                                    <span className="text-lg font-semibold">
                                        No Result Found!!!
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col gap-3'>
                                {searchResult.map((result, index) => (
                                    <SearchResult key={index} searchResult={result} />
                                ))}
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Search
