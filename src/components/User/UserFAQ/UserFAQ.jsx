import React from 'react'
import { useSelector } from 'react-redux'
import UserFAQPanel from './UserFAQPanel';

const UserFAQ = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'bg-white'

    return (
        <section className={`user-faq border-l bg-gradient-to-r dark:border-gray-700 px-2 z-0 ${userHomeClasses} h-full flex items-start justify-start`}>
                <UserFAQPanel />
        </section>
    )
}

export default UserFAQ
