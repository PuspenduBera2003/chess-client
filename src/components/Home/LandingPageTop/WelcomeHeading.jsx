import React from 'react'
import { useSpring, animated } from 'react-spring';
import { TypeAnimation } from 'react-type-animation';
import { useSelector } from 'react-redux'
import './WelcomeHeading.css'

const WelcomeHeading = () => {

    const textFadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        delay: 500,
    });

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const typingWordClass = (currentTheme === "dark")
        ? 'typing-text-lg-device'
        : '';

    const headingClass = (currentTheme === "dark")
        ? 'welcome-heading-lg-device'
        : '';

    return (
        <div className="w-full block">
            <div className='flex items-center justify-center'>
                <animated.h1 style={textFadeIn} className={`welcome-text text-center ${headingClass} dark:text-white text-2xl md:text-4xl font-bold mb-8 bg-gradient-to-r font-fancy rounded-lg p-2 lg:shadow-lg shadow-lime-700`}>
                    WELCOME TO CHESSHUB
                </animated.h1>
            </div>
            <div className={`w-full dark:text-white h-14 flex items-center justify-center relative top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-4 ${typingWordClass}`}>
                <TypeAnimation
                    sequence={[
                        'CHESSHUB PROVIDES YOU THE OPPORTUNITY TO PLAY',
                        1000,
                        'CHESSHUB PROVIDES YOU THE OPPORTUNITY TO LEARN',
                        1000,
                        'CHESSHUB PROVIDES YOU THE OPPORTUNITY TO CONNECT WITH FRIENDS',
                        1000
                    ]}
                    wrapper="h2"
                    speed={50}
                    repeat={Infinity}
                    className='text-lg md:text-xl font-semibold text-center'
                />
            </div>
        </div>
    )
}

export default WelcomeHeading
