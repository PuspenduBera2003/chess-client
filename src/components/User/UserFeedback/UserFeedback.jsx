import React from 'react'
import { useSelector } from 'react-redux'
import UserFeedbackPanel from './UserFeedbackPanel'

const UserFeedback = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'bg-white'

    return (
        <div className={`user-right-panel w-full border-l bg-gradient-to-r dark:border-gray-700 px-2 z-0 ${userHomeClasses}`}>
            <UserFeedbackPanel top={75} />
        </div>
    )
}

export default UserFeedback
