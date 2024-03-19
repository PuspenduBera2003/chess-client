import React from 'react'
import { useSelector } from 'react-redux'
import './UserHome.css'
import UserProfileCard from './UserProfileCard'

const UserHome = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme)

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'bg-white'

    return (
        <section className={`user-right-panel border-l bg-gradient-to-r dark:border-gray-700 px-2 z-0 ${userHomeClasses}`}>
            <UserProfileCard />
        </section>
    )
}

export default UserHome