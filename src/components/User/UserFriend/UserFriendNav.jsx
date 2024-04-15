import React from 'react'

const UserFriendNav = (props) => {

    const { setActiveTab, activeTab, top } = props;

    return (
        <div className="inline-flex rounded-md shadow-md dark:shadow-white fixed z-10" style={{ top: top }} role="group">
            <button
                type="button"
                onClick={() => { setActiveTab("friends") }}
                className={`px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeTab === 'friends' ? "border-2 text-blue-700 border-blue-600 dark:border-white dark:text-white" : 'text-gray-900'}`}>
                <i className="fa-solid fa-user-group w-3 h-3 me-3"></i>
                Friends
            </button>
            <button
                type="button"
                onClick={() => { setActiveTab("pending") }}
                className={`px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeTab === 'pending' ? "border-2 text-blue-700 border-blue-600 dark:border-white dark:text-white" : 'text-gray-900'}`}>
                <i className="fa-solid fa-hourglass-half w-3 h-3 me-2"></i>
                Pending
            </button>
        </div>
    )
}

export default UserFriendNav
