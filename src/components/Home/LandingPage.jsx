import React from 'react';
import { useSelector } from 'react-redux'
import LandingPageTop from './LandingPageTop/LandingPageTop';
import Features from './Features/Features';
import Developers from './Developers/Developers';
import Carousels from './Carousels/Carousels';
import AuthenticationWarning from './AuthenticationWarning/AuthenticationWarning';
import './LandingPage.css'
import Authenticated from './AuthenticationWarning/Authenticated';

const LandingPage = () => {

    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);
    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    return (
        <div className={`bg-gradient-to-r ${gradientClasses}`}>
            <LandingPageTop />
            {isAuthenticated ? <Authenticated /> : <AuthenticationWarning />}
            <Carousels />
            <Features />
            <Developers />
        </div>
    );
};

export default LandingPage;