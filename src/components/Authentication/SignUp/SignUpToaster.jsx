import React from 'react'
import { useSpring, animated } from 'react-spring';
import { ClipLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

const SignUpToaster = () => {

    const theme = useSelector(state => state.Theme.currentTheme)

    const animationProps = useSpring({
        from: { opacity: 0, transform: 'translateX(450px)' },
        to: { opacity: 1, transform: 'translateX(0)' },
    });

    return (
        <animated.div className="flex items-center justify-center w-full max-w-xs py-4 px-0 text-gray-700 bg-white rounded-lg shadow dark:text-gray-300 dark:bg-gray-800 fixed bottom-2 right-2" style={animationProps} role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 rounded-lg ">
                <ClipLoader color={`${theme === "dark" ? "#b4b8b5" : "#111211"}`} size={25} />
                <span className="sr-only">
                    Warning icon
                </span>
            </div>
            <div className="ms-3 text-sm font-normal">
                Checking Your Credentials
            </div>
        </animated.div>
    )
}

export default SignUpToaster
