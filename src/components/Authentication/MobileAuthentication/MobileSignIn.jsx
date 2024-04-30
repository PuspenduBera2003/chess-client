import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import handleSignInSubmit from '../../../api/handleSignInSubmit';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import updateUserDetails from '../../../redux/Auth/Actions/userDetails';
import updateIsAuthenticated from '../../../redux/Auth/Actions/IsAuthenticated';
import AuthenticationAlert from '../AuthenticationAlert';

const toggleClasses = 'text-gray-800 dark:text-gray-200'

function isValidEmail(email) {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

const MobileSignIn = () => {

    const theme = useSelector(state => state.Theme.currentTheme);

    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });

    const [error, setError] = useState({ error: false, description: null });

    const [type, setType] = useState(true)

    const [signInInitialized, setSignInInitialized] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [disabled, setDisabled] = useState(true);

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
        <div className={`login z-20 ${theme === 'dark' ? 'sign-in-dark' : 'sign-in-light'} w-full m-3`}>
            <form onSubmit={handleSubmit}>
                <label className='mobile-auth-label text-gray-100 text-center' htmlFor="chk" aria-hidden="true">
                    Sign In
                </label>
                <div className={`${theme === 'dark' ? 'sign-in-input-dark' : 'sign-in-input-light'} py-2 rounded-xl mx-2 shadow-lg`}>
                    <input className={`mobile-auth-input shadow-md bg-gray-100 dark:bg-gray-600 p-6 rounded-lg text-black dark:text-white ${theme === 'dark' ? 'dark-placeholder' : 'light-placeholder'}`} type="text" value={credentials.email} name='email' onChange={onChange} placeholder='Email' />
                    <div className='relative'>
                        <input className={`mobile-auth-input shadow-md bg-gray-100 dark:bg-gray-600 p-6 rounded-lg text-black dark:text-white ${theme === 'dark' ? 'dark-placeholder' : 'light-placeholder'}`} type={type ? 'password' : 'text'} value={credentials.password} name='password' onChange={onChange} placeholder='Password' />
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
                        error.error &&
                        <div className='px-5 mt-2'>
                            <AuthenticationAlert error={error} setError={setError} />
                        </div>
                    }
                    <div className='w-full flex items-center justify-center mt-3'>
                        <Link to='/forget-password' className='text-blue-700 dark:text-blue-400'>
                            Forget Your Password?
                        </Link>
                    </div>
                    <div className='w-full flex flex-col flex-wrap items-center justify-center gap-3 mt-5'>
                        <button type='submit' className={`auth-button ${disabled ? 'sign-up-disabled' : 'sign-up-clickable'} p-3 rounded-lg`} disabled={signInInitialized || disabled}>
                            Sign In
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MobileSignIn
