import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import handleSignInSubmit from '../../../api/handleSignInSubmit';
import updateIsAuthenticated from '../../../redux/Auth/Actions/IsAuthenticated';
import AuthenticationAlert from '../AuthenticationAlert';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import updateUserDetails from '../../../redux/Auth/Actions/userDetails';

const toggleClasses = 'text-gray-800 dark:text-gray-200'

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const SignIn = () => {

    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });

    const [error, setError] = useState({ error: false, description: null });

    const [type, setType] = useState(true)

    const [signInInitialized, setSignInInitialized] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const [disabled, setDisabled] = useState(true);

    const formClasses = (currentTheme === "dark")
        ? 'dark-auth-container'
        : 'light-auth-container';

    const inputClass = (currentTheme === "dark")
        ? 'dark-input'
        : 'light-input';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignInInitialized(true);
        dispatch(updateShowBotomToast({ show: true, type: 'loading', message: "Checking Your Credentials" }));
        const response = await handleSignInSubmit(credentials);
        if (response.success) {
            dispatch(updateUserDetails(response.user));
            localStorage.setItem('isAuthenticated', true);
            dispatch(updateIsAuthenticated(true));
            navigate('/user/dashboard');
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: "Signed In Successfully" }));
        } else {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: response.error }));
            localStorage.setItem('isAuthenticated', false);
            dispatch(updateIsAuthenticated(false));
            setError({ error: true, description: response.error })
        }
        setSignInInitialized(false)
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

    useEffect(() => {
        setSignInInitialized(false)
    }, [])

    useEffect(() => {
        if (credentials.password.length >= 5) {
            const emailValidation = isValidEmail(credentials.email);
            if (emailValidation) {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        } else {
            setDisabled(true)
        }
    }, [credentials])

    return (
        <div className={`form-container sign-in ${formClasses}`} style={{ backgroundColor: 'black' }}>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <h1 className='text-3xl font-bold text-gray-950 dark:text-white mb-2'>
                    Sign In
                </h1>
                <input type="text" value={credentials.email} name='email' onChange={onChange} className={`${inputClass} dark:text-white ${currentTheme === 'dark' ? 'dark-placeholder' : 'light-placeholder'}`} placeholder="Email" autoComplete='off' />
                <div className='relative w-full'>
                    <input type={type ? 'password' : 'text'} value={credentials.password} name='password' onChange={onChange} className={`${inputClass} dark:text-white w-full ${currentTheme === 'dark' ? 'dark-placeholder' : 'light-placeholder'}`} placeholder="Password" />
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
                    error.error &&
                    <AuthenticationAlert error={error} setError={setError} />
                }
                <Link to='/forget-password' className='text-blue-700 dark:text-blue-400'>
                    Forget Your Password?
                </Link>
                <button type='submit' className={`auth-button ${disabled ? 'sign-up-disabled' : 'sign-up-clickable'}`} disabled={signInInitialized || disabled}>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default SignIn
