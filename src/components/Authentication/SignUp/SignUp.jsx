import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './PasswordChecker.css'
import AuthenticationAlert from '../AuthenticationAlert';
import updateSignUpInitialized from '../../../redux/Auth/Actions/signUpInitialized';
import generateOTP from '../../../api/generateOtp';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';

const toggleClasses = 'text-gray-800 dark:text-gray-200'

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const SignUp = () => {

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const [type, setType] = useState(true)

    const formClasses = (currentTheme === "dark")
        ? 'dark-auth-container'
        : 'light-auth-container';

    const inputClass = (currentTheme === "dark")
        ? 'dark-input'
        : 'light-input';

    const passwordCheckerClasses = (currentTheme === "dark")
        ? 'dark-password-checker'
        : 'light-password-checker'

    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "" })
    const [password, setPassword] = useState('');
    const [point, setPoint] = useState(0);
    const [showSubmitButton, setShowSubmitButton] = useState(false)
    const [error, setError] = useState({ error: false, description: null });

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
        <div className={`form-container sign-up ${formClasses}`}>
            <form onSubmit={handleSubmit} className='overflow-auto'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center'>
                    Create Account
                </h1>
                <input type="text" placeholder="Username" value={credentials.username} name='username' onChange={onChange} className={`${inputClass} dark:text-white`} />
                <input type="email" placeholder="Email" value={credentials.email} name='email' onChange={onChange} className={`${inputClass} dark:text-white`} required />
                <div className="password-group">
                    <div className='relative'>
                        <input
                            type={type ? 'password' : 'text'}
                            placeholder="Password"
                            value={credentials.password}
                            name='password'
                            onChange={handlePasswordChange}
                            className={`${inputClass} dark:text-white`} />
                        {
                            type ?
                                <button
                                    type='button'
                                    onClick={() => handleTypeChange()}
                                    className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-register'>
                                    <i className={`fa-regular fa-eye ${toggleClasses}`}></i>
                                </button> :
                                <button
                                    type='button'
                                    onClick={() => handleTypeChange()}
                                    className='bg-gray-50 dark:bg-gray-800 px-2 rounded-md z-10 absolute right-2 top-register'>
                                    <i className={`fa-regular fa-eye-slash ${toggleClasses}`} ></i>
                                </button>
                        }
                    </div>
                    {
                        password &&
                        <div className={`power-container ${passwordCheckerClasses} mt-1`}>
                            <div
                                id="power-point"
                                style={{ width: widthPower[point], backgroundColor: colorPower[point] }}
                            ></div>
                        </div>
                    }
                    {
                        error.error &&
                        <AuthenticationAlert error={error} setError={setError} />
                    }
                </div>
                <button type='submit' className={`auth-button ${showSubmitButton ? 'sign-up-clickable' : 'sign-up-disabled pointer-events-none'}`} disabled={!showSubmitButton}>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default SignUp