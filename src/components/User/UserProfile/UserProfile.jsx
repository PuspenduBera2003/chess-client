import React from 'react'
import { useSelector } from 'react-redux'
import UserDetails from './UserDetails'

const UserProfile = () => {
    const currentTheme = useSelector(state => state.Theme.currentTheme)

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'bg-white'

    return (
        <section className={`user-right-panel border-l bg-gradient-to-r dark:border-gray-700 px-2 z-0 ${userHomeClasses}`}>
            <UserDetails />
        </section>
    )
}

export default UserProfile
