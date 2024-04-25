import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import './Authentication.css';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import OtpPage from './SignUp/OtpPage';
import SignUpToaster from './SignUp/SignUpToaster';
import updateSignUpInitialized from '../../redux/Auth/Actions/signUpInitialized';
import PasswordPolicy from './SignUp/PasswordPolicy';

const Authentication = () => {
    const [isSignIn, setIsSignIn] = useState(false);

    const dispatch = useDispatch();

    const { path } = useParams();
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setIsSignIn(true);
        navigate('/auth/signup');
    };

    const handleLoginClick = () => {
        setIsSignIn(false);
        navigate('/auth/signin');
    };

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

    const signUpInitialized = useSelector(state => state.Auth.signUpInitialized);

    const containerClasses = (currentTheme === "dark")
        ? 'dark-auth-container'
        : 'light-auth-container';

    const authClasses = (currentTheme === "dark")
        ? 'dark-mode-auth'
        : 'light-mode-auth';

    useEffect(() => {
        if (path === 'signup') {
            setIsSignIn(true);
        } else {
            setIsSignIn(false);
        }

    }, [setIsSignIn, path]);

    useEffect(() => {
        if (isAuthenticated)
            navigate('/user/dashboard');
    });

    useEffect(() => {
        return () => {
            dispatch(updateSignUpInitialized({
                start: false, response: {
                    success: false,
                    serverReplied: false
                }, email: '', password: '', username: '', token: ''
            }));
        }
    }, [])

    return (
        <div className={`auth ${authClasses}`}>
            <div className={`auth-container ${containerClasses} m-2 ${isSignIn ? 'active' : ''} border border-white dark:border-gray-700`}>
                {
                    !signUpInitialized.response.success ?
                        <div>
                            <SignUp />
                            <SignIn />
                            <div className="toggle-container">
                                <div className="toggle">
                                    <div className="toggle-panel toggle-left">
                                        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Welcome Back !</h1>
                                        <p>Enter your personal details to use all site features</p>
                                        <button className="toggle-button auth-button" id='login' onClick={handleLoginClick}>Sign In</button>
                                        <PasswordPolicy />
                                    </div>
                                    <div className="toggle-panel toggle-right">
                                        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Welcome, Friend!</h1>
                                        <p>Enter your personal details to use all site features</p>
                                        <button className="toggle-button auth-button" id='register' onClick={handleRegisterClick}>Sign Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <OtpPage />
                }
            </div>
            {
                signUpInitialized.start && !signUpInitialized.response.serverReplied && <SignUpToaster />
            }
        </div>
    );
};

export default Authentication;