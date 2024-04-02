import React from 'react'
import { useSelector } from 'react-redux'
import CommentStar from './CommentStar'

const CommentCard = (props) => {

    const theme = useSelector(state => state.Theme.currentTheme)

    const userDetails = useSelector(state => state.Auth.userDetails);

    const { feedback } = props

    return (
        <div className={`p-2 w-full bg-cyan-50 border border-gray-200 rounded-lg shadow ${theme === 'dark' ? 'dark-mode-feature-card' : 'bg-cyan-50'} dark:border-gray-700 flex flex-col flex-wrap gap-2`}>
            <div className="flex flex-row flex-wrap gap-2">
                {
                    feedback.profile_photo ?
                        <img className="w-24 h-24 rounded-full shadow-lg" src={feedback.profile_photo} alt={feedback.username} />
                        :
                        <div className="flex items-center">
                            <svg className="w-24 h-24 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </div>
                }
                <div className="p-1 sm:p-3 flex flex-col gap-2">
                    <h5 className="text-lg font-semibold text-black dark:text-white">
                        {feedback.username}
                    </h5>
                    <CommentStar value={feedback.rating} />
                </div>
            </div>
            <div className={`w-full text-justify border rounded-xl text-black dark:text-gray-300 border-gray-400 dark:border-gray-500 p-2 ${theme === 'dark' ? 'bg-zinc-800' : ''}`}>
                {
                    (userDetails.username === feedback.username) &&
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                        My Feedback
                    </span>
                }
                {feedback.comment}
            </div>
        </div>
    )
}

export default CommentCard
