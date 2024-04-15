import React, { useState } from 'react'
import UserFeedbackNav from './UserFeedbackNav'
import PostFeedback from './PostFeedback/PostFeedback'
import Comment from './ExistingFeedback/Comment'

const UserFeedbackPanel = (props) => {

    const [activeTab, setActiveTab] = useState("myFeedback");

    return (
        <div className='flex flex-col gap-4 w-full items-center justify-center'>
            <UserFeedbackNav activeTab={activeTab} setActiveTab={setActiveTab} top={props.top} />
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
    )
}

export default UserFeedbackPanel
