import React from 'react'

const UserFeedbackNav = (props) => {

    const { setActiveTab, activeTab } = props;

    return (
        <div className="inline-flex rounded-md shadow-md dark:shadow-white fixed z-10" style={{ top: 75 }} role="group">
            <button
                type="button"
                onClick={() => { setActiveTab("myFeedback") }}
                className={`px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeTab === 'myFeedback' ? "border-2 text-blue-700 border-blue-600 dark:border-white dark:text-white" : 'text-gray-900'}`}>
                <i className="fa-solid fa-user-group w-3 h-3 me-3"></i>
                Your Feedback
            </button>
            <button
                type="button"
                onClick={() => { setActiveTab("allFeedbacks") }}
                className={`px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white ${activeTab === 'allFeedbacks' ? "border-2 text-blue-700 border-blue-600 dark:border-white dark:text-white" : 'text-gray-900'}`}>
                <i className="fa-solid fa-hourglass-half w-3 h-3 me-2"></i>
                All Feedbacks
            </button>
        </div>
    )
}

export default UserFeedbackNav
