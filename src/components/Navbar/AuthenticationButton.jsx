import React from 'react'
import { useNavigate } from 'react-router-dom'

const AuthenticationButton = () => {

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/auth/signin');
    }

    const handleSignUp = () => {
        navigate('/auth/signup');
    }

    return (
        <div className='flex flex-row items-center justify-center gap-0.5 md:order-2 nav-button-group'>
            <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleSignIn}>
                Sign In
            </button>
            <button
                type="button"
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                onClick={handleSignUp}>
                Sign Up
            </button>
        </div>
    )
}

export default AuthenticationButton
