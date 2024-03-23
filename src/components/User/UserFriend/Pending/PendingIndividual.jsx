import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring';
import Accept from '../../UserSearch/Search/Buttons/Accept';
import Reject from '../../UserSearch/Search/Buttons/Reject';

const PendingIndividual = (props) => {

    const { details } = props;

    const [hidden, setHidden] = useState(false)

    const animationProps = useSpring({
        from: { transform: 'translateY(30px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: { tension: 300, friction: 10 },
    })

    return (
        <animated.div
            style={animationProps}
            className={`w-72 max-w-sm bg-cyan-50 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${hidden && 'hidden'}`}>
            <div className="flex flex-col items-center pb-5 pt-5">
                {
                    details.profile_photo ?
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={details.profile_photo} alt={details.username} />
                        :
                        <div className="flex items-center mb-3">
                            <svg className="w-24 h-24 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </div>
                }
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {details.username}
                </h5>
                <div className="flex items-center justify-center mt-4 md:mt-6 flex-wrap gap-2">
                    <div onClick={() => { setHidden(true) }}>
                        <Accept rid={details.id} />
                    </div>
                    <div onClick={() => { setHidden(true) }}>
                        <Reject rid={details.id} />
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default PendingIndividual
