import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CommentStar from '../ExistingFeedback/CommentStar';
import UpdateTextBox from './UpdateTextBox';

const OwnCommentCard = (props) => {

    const theme = useSelector(state => state.Theme.currentTheme)

    const userDetails = useSelector(state => state.Auth.userDetails);

    const [showComment, setShowComment] = useState(true);

    const handleEditClick = () => {
        setShowComment(false)
    }

    return (
        <>
            {showComment ?
                (
                    <div className={`w-full max-w-sm bg-cyan-50 border border-gray-200 rounded-lg shadow ${theme === 'dark' ? 'dark-mode-feature-card' : 'bg-cyan-50'} dark:border-gray-700 flex-col flex-wrap`}>
                        <div className={`w-full flex border-b dark:border-gray-600 items-center justify-end bg-gray-200 dark:bg-gray-700 p-2 rounded-t-lg  ${theme === 'dark' ? 'dark-mode-landing-page' : 'bg-cyan-50'}`}>
                            <button
                                type="button"
                                onClick={handleEditClick}
                                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                                Edit
                                <i className="fa-regular fa-pen-to-square ml-2"></i>
                            </button>
                        </div>
                        <div className="flex flex-row flex-wrap gap-2 p-2">
                            {
                                userDetails.profile_photo ?
                                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={userDetails.profile_photo} alt={userDetails.username} />
                                    :
                                    <div className="flex items-center">
                                        <svg className="w-24 h-24 mb-3 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                        </svg>
                                    </div>
                            }
                            <div className="p-3 flex flex-col gap-2">
                                <h5 className="text-lg font-semibold text-black dark:text-white">
                                    {userDetails.username}
                                </h5>
                                <CommentStar value={props.rating} />
                            </div>
                        </div>
                        <div className={`text-justify border rounded-xl text-black dark:text-gray-300 border-gray-400 dark:border-gray-500 p-2 m-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                            {props.comment}
                        </div>
                    </div>
                )
                :
                (
                    <div className="flex-col gap-5 items-center justify-center pb-2">
                        <UpdateTextBox comment={props.comment} rating={props.rating} />
                    </div>
                )
            }
        </>
    )
}

export default OwnCommentCard
