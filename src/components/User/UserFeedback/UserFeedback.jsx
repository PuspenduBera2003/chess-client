import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Comment from './ExistingFeedback/Comment'
import UserFeedbackNav from './UserFeedbackNav'
import PostFeedback from './PostFeedback/PostFeedback'

const UserFeedback = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const [activeTab, setActiveTab] = useState("myFeedback");

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'bg-white'

    return (
        <div className={`user-right-panel w-full border-l bg-gradient-to-r dark:border-gray-700 px-2 z-0 ${userHomeClasses}`}>
            <div className='flex flex-col gap-4 w-full items-center justify-center'>
                <UserFeedbackNav activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className='w-full flex items-center justify-center' style={{ marginTop: 65 }}>
                    {
                        activeTab === "myFeedback" &&
                        <PostFeedback />
                    }
                    {
                        activeTab === "allFeedbacks" &&
                        <Comment />
                    }
                </div>
            </div>
        </div>
    )
}

export default UserFeedback
