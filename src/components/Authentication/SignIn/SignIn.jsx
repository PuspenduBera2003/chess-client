import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import handleSignInSubmit from '../../../api/handleSignInSubmit';
import updateIsAuthenticated from '../../../redux/Auth/Actions/IsAuthenticated';
import AuthenticationAlert from '../AuthenticationAlert';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import updateUserDetails from '../../../redux/Auth/Actions/userDetails';

const SignIn = () => {

    const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });

    const [error, setError] = useState({ error: false, description: null });

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

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setSignInInitialized(false)
    }, [])

    useEffect(() => {
        if (credentials.password.length >= 5) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [credentials])

    return (
        <div className={`form-container sign-in ${formClasses}`} style={{ backgroundColor: 'black' }}>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <h1 className='text-3xl font-bold text-gray-950 dark:text-white'>
                    Sign In
                </h1>
                <div className="social-icons flex flex-row flex-wrap gap-2">
                    <div className="icon flex items-center justify-center border cursor-pointer hover:opacity-75"><i className="fa-brands fa-google-plus-g dark:text-white transition-opacity duration-200 ease-in-out"></i></div>
                    <div className="icon flex items-center justify-center border cursor-pointer hover:opacity-75"><i className="fa-brands fa-facebook-f dark:text-white transition-opacity duration-200 ease-in-out"></i></div>
                    <div className="icon flex items-center justify-center border cursor-pointer dark:text-white hover:opacity-75 transition-opacity duration-200 ease-in-out"><i className="fa-brands fa-github"></i></div>
                    <div className="icon flex items-center justify-center border cursor-pointer dark:text-white hover:opacity-75 transition-opacity duration-200 ease-in-out"><i className="fa-brands fa-linkedin-in"></i></div>
                </div>
                <span className='text-gray-900 dark:text-white'>
                    or use your email password
                </span>
                <input type="text" value={credentials.email} name='email' onChange={onChange} className={`${inputClass} dark:text-white`} placeholder="Email" autoComplete='off' />
                <input type="password" value={credentials.password} name='password' onChange={onChange} className={`${inputClass} dark:text-white`} placeholder="Password" />
                {
                    error.error &&
                    <AuthenticationAlert error={error} setError={setError} />
                }
                <Link to='/forget-password' className='dark:text-gray-200'>
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
