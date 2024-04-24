import React from 'react'
import UserFAQPanel from '../User/UserFAQ/UserFAQPanel'
import { useSelector } from 'react-redux';

const Support = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    return (
        <div className={`${gradientClasses} support w-full flex items-start justify-center`}>
            <UserFAQPanel />
        </div>
    )
}

export default Support
