import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import handleSignInSubmit from './handleSignInSubmit';
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
            localStorage.setItem('isAuthenticated', false);
            dispatch(updateIsAuthenticated(false));
            setError({ error: true, description: response.error })
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        setSignInInitialized(false)
    }, [])

    return (
        <div className={`form-container sign-in ${formClasses}`} style={{ backgroundColor: 'black' }}>
            <form onSubmit={handleSubmit}>
                <h1 className='text-3xl font-bold text-gray-950 dark:text-white'>
                    Sign In
                </h1>
                <div className="social-icons">
                    <a href="/" className="icon"><i className="fa-brands fa-google-plus-g dark:text-white"></i></a>
                    <a href="/" className="icon"><i className="fa-brands fa-facebook-f dark:text-white"></i></a>
                    <a href="/" className="icon"><i className="fa-brands fa-github dark:text-white"></i></a>
                    <a href="/" className="icon"><i className="fa-brands fa-linkedin-in dark:text-white"></i></a>
                </div>
                <span className='text-gray-900 dark:text-white'>
                    or use your email password
                </span>
                <input type="text" value={credentials.username} name='username' onChange={onChange} className={`${inputClass} dark:text-white`} placeholder="Username" />
                <input type="password" value={credentials.password} name='password' onChange={onChange} className={`${inputClass} dark:text-white`} placeholder="Password" />
                {
                    error.error &&
                    <AuthenticationAlert error={error} setError={setError} />
                }
                <a href="/" className='dark:text-gray-200'>
                    Forget Your Password?
                </a>
                <button type='submit' className='auth-button sign-up-clickable' disabled={signInInitialized}>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default SignIn
