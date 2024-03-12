import React from 'react'
import Features from '../Home/Features/Features'
import './GameOptions.css'
import { useSelector } from 'react-redux'

const GameOptions = () => {
    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    return (
        <div className={`game ${gradientClasses} p-2`}>
            <Features />
        </div>
    )
}

export default GameOptions