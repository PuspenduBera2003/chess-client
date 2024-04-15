import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import backgroundImage from '../../../static/images/chessboard2.jpg'

const AuthenticationWarning = () => {

    const navigate = useNavigate()

    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
    }))

    const sectionAnimation = useSpring({
        from: { opacity: 0, transform: 'translateY(150px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    });

    const handleSignInClick = () => {
        navigate('/auth/signin');
    }

    const handleSignUpClick = () => {
        navigate('/auth/signup');
    }

    return (
        <animated.section
            style={{ ...sectionAnimation, backgroundColor: '#d0fcbd', width: '80vw', backgroundImage: `url(${backgroundImage})` }}
            className='mx-auto p-8 bg-opacity-25 backdrop-filter backdrop-blur-xl border border-opacity-25 rounded-xl bg-center bg-no-repeat bg-gray-700 bg-blend-multiply overflow-hidden shadow-lg shadow-slate-700'>
            <animated.div
                style={{
                    ...springs,
                }}
            >
                <section className='bg-center bg-no-repeat bg-gray-700 bg-blend-multiply rounded-lg overflow-hidden py-8' style={{ backgroundImage: `url(${backgroundImage})` }}>
                    <div className="py-4 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
                        <h1 className="mb-4 text-2xl font-bold tracking-tight leading-none text-white md:text-3xl lg:text-4xl">
                            PLEASE SIGN IN OR SIGN UP
                        </h1>
                        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                            To access all functionalities of our website, Please create an account or sign in with existing credentials!
                        </p>
                        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">

                            <button
                                onClick={handleSignInClick}
                                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                            >
                                Sign In
                                <i className="fa-solid fa-arrow-right ml-2"></i>
                            </button>
                            <button
                                onClick={handleSignUpClick}
                                className="py-3 px-5 sm:ms-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-70"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </section>
            </animated.div>
        </animated.section>
    )
}

export default AuthenticationWarning
