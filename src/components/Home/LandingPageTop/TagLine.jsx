import React from 'react'
import MovingText from 'react-moving-text'
import { useSelector } from 'react-redux'

const TagLine = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const isDarkMode = (currentTheme === "dark")
        ? 'dark-mode-feature-card'
        : 'from-lime-200 via-lime-400 to-lime-500';

    return (
        <div className="flex items-center justify-center">
            <MovingText
                type="jelly"
                duration="2000ms"
                delay="0s"
                direction="normal"
                timing="ease"
                iteration="3"
                fillMode="none"
            >
                <p className={`font-medium ${isDarkMode} dark:text-white text-xl lg:text-4xl tagline rounded-lg border border-gray-700 dark:border-gray-400 text-center`}>
                    Elevate Your Chess IQ With <span className='app-name font-bold text-blue-900 dark:text-white'>CHESSHUB</span>,<br /> Where Strategy Meets Success
                </p>
            </MovingText>
        </div>
    )
}

export default TagLine
