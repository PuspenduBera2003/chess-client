import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import updateSignUpInitialized from '../../../redux/Auth/Actions/signUpInitialized';
import generateOTP from '../../../api/generateOtp';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import OtpPage from '../SignUp/OtpPage';
import AuthenticationAlert from '../AuthenticationAlert';
import PasswordPolicy from '../SignUp/PasswordPolicy';
const toggleClasses = 'text-gray-800 dark:text-gray-200'

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const MobileSignUp = () => {

    const [type, setType] = useState(true);
    const currentTheme = useSelector(state => state.Theme.currentTheme);
    const signUpInitialized = useSelector(state => state.Auth.signUpInitialized);

    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "" })
    const [password, setPassword] = useState('');
    const [point, setPoint] = useState(0);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [error, setError] = useState({ error: false, description: null });

    const passwordCheckerClasses = (currentTheme === "dark")
        ? 'dark-password-checker'
        : 'light-password-checker'

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowSubmitButton(false);
        if (widthPower[point] !== "100%")
            return
        setPassword('')
        dispatch(updateSignUpInitialized({
            start: true, response: {
                success: false,
                serverReplied: false
            }, email: '', password: '', username: '', token: ''
        }))
        const handleGenerateOTP = await generateOTP(credentials);
        if (!handleGenerateOTP.success) {
            setError({ error: true, description: handleGenerateOTP.error })
            dispatch(updateSignUpInitialized({
                start: true, response: {
                    success: false,
                    serverReplied: true
                }, email: '', password: '', username: '', token: ''
            }))
        } else {
            dispatch(updateSignUpInitialized({
                start: true, response: {
                    success: true,
                    serverReplied: true
                }, email: credentials.email, password: credentials.password, username: credentials.username, token: handleGenerateOTP.token
            }));
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'OTP Send Successfully' }))
        }
    }

    const handleTypeChange = () => {
        if (type) {
            setType(false);
        } else {
            setType(true);
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const widthPower = ["1%", "25%", "50%", "75%", "100%"];
    const colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];

    const handlePasswordChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
        const value = e.target.value;
        let newPoint = 0;
        if (value.length >= 6) {
            const arrayTest = [/[0-9]/, /[a-z]/, /[A-Z]/, /[^0-9a-zA-Z]/];
            arrayTest.forEach((item) => {
                if (item.test(value)) {
                    newPoint += 1;
                }
            });
        }
        setPoint(newPoint);
        setPassword(value);
    };

    useEffect(() => {
        const validEmail = isValidEmail(credentials.email);
        if (widthPower[point] === "100%" && credentials.username.length >= 5 && validEmail) {
            setShowSubmitButton(true);
        } else {
            setShowSubmitButton(false);
            if (credentials.username.length < 5) {
                setError({ error: true, description: 'Check Username Length' })
            } else if (!validEmail) {
                setError({ error: true, description: 'Email is invalid' })
            } else {
                setError({ error: true, description: 'Check Password Policy' })
            }
        }
    }, [credentials]);

    return (
        <div className={`signup`}>
            {
                !signUpInitialized.response.success ?
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <label className='mobile-auth-label text-gray-900 dark:text-gray-100 text-center' htmlFor="chk" aria-hidden="true">Sign Up</label>
                        <input
                            className='mobile-auth-input bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-black dark:text-white'
                            type="text"
                            placeholder="Username"
                            value={credentials.username}
                            name='username'
                            autoComplete='off'
                            onChange={onChange} />
                        <input className='mobile-auth-input bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-black dark:text-white'
                            type="email"
                            placeholder="Email"
                            value={credentials.email}
                            name='email'
                            onChange={onChange}
                            autoComplete='off'
                            required />
                        <div className='relative'>
                            <input
                                className='mobile-auth-input bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-black dark:text-white'
                                type={type ? 'password' : 'text'}
                                placeholder="Password"
                                value={credentials.password}
                                name='password'
                                onChange={handlePasswordChange} />
                            {
                                type ?
                                    <button
                                        type='button'
                                        onClick={() => handleTypeChange()}
                                        className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md absolute' style={{ right: '1.5rem', top: '0.7rem' }}>
                                        <i className={`fa-regular fa-eye ${toggleClasses}`}></i>
                                    </button> :
                                    <button
                                        type='button'
                                        onClick={() => handleTypeChange()}
                                        className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md absolute' style={{ right: '1.5rem', top: '0.7rem' }}>
                                        <i className={`fa-regular fa-eye-slash ${toggleClasses}`} ></i>
                                    </button>
                            }
                        </div>
                        {
                            password &&
                            <div className='w-full flex items-center justify-center'>
                                <div className={`power-container ${passwordCheckerClasses} mt-1`} style={{ width: '90%' }}>
                                    <div
                                        id="power-point"
                                        className='h-3 rounded-lg'
                                        style={{ width: widthPower[point], backgroundColor: colorPower[point] }}
                                    ></div>
                                </div>
                            </div>
                        }
                        {
                            error.error &&
                            <div className='px-5 mt-2'>
                                <AuthenticationAlert error={error} setError={setError} />
                            </div>
                        }
                        <div className='w-full flex flex-col flex-wrap items-center justify-center gap-3'>
                            <button type='submit' className={`auth-button p-3 rounded-lg mt-4 ${showSubmitButton ? 'sign-up-clickable' : 'sign-up-disabled pointer-events-none'}`} disabled={!showSubmitButton}>
                                Sign Up
                            </button>
                            <div className='flex items-center justify-center'>
                                <PasswordPolicy light={true} />
                            </div>
                        </div>
                    </form>
                    :
                    <OtpPage height='30rem' />
            }
        </div>
    )
}

export default MobileSignUp
