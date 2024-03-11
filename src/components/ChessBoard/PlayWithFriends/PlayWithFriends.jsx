import React from 'react'
import SendLinkCard from './SendLinkCard'
import { useSelector } from 'react-redux'

const PlayWithFriends = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    return (
        <div className={`w-full game flex items-center justify-center ${gradientClasses}`}>
            <SendLinkCard />
        </div>
    )
}

export default PlayWithFriends