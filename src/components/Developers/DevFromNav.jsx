import React from 'react'
import Developers from '../Home/Developers/Developers'
import { useSelector } from 'react-redux';

const DevFromNav = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    return (
        <div className={`${gradientClasses} flex flex-col items-center justify-center w-full`} style={{ minHeight: 'calc(100vh - 3.75rem)' }}>
            <Developers />
        </div>
    )
}

export default DevFromNav
