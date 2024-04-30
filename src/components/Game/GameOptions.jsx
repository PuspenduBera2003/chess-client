import React from 'react'
import './GameOptions.css'
import { useSelector } from 'react-redux'
import features from '../Home/Features/featuresArray'
import { useTrail, animated } from 'react-spring';
import FeatureIndividual from '../Home/Features/FeatureIndividual';

const GameOptions = () => {
    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    const trail = useTrail(features.length, {
        config: { mass: 1, tension: 500, friction: 25 },
        from: { opacity: 0, transform: 'translateY(-250px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
    });

    return (
        <div className={`${gradientClasses} p-2 mb-0 features-game`} >
            <div className='w-full flex flex-wrap items-center justify-center gap-2 md:gap-4 p-2 features-game'>
                {trail.map((props, index) => (
                    <animated.div key={index} style={props}>
                        <FeatureIndividual data={features[index]} />
                    </animated.div>
                ))}
            </div>
        </div>
    )
}

export default GameOptions
