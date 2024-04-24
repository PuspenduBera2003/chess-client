import React from 'react'
import { useSelector } from 'react-redux'
import UserGamePanel from './UserGamePanel'

const UserGame = () => {
    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'bg-white'

    return (
        <section className={`user-faq border-l flex items-start justify-center bg-gradient-to-r dark:border-gray-700 z-0 ${userHomeClasses}`}>
            <UserGamePanel />
        </section>
    )
}

export default UserGame
