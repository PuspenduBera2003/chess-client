import React from 'react';
import { useTrail, animated } from 'react-spring';
import { Element } from 'react-scroll';
import { useInView } from 'react-intersection-observer';
import FeatureIndividual from './FeatureIndividual';
import features from './featuresArray';

const Features = () => {

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const trail = useTrail(features.length, {
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(250px)',
        config: { mass: 1, tension: 500, friction: 25 },
    });

    return (
        <Element name='features'>
            <div ref={ref} className='w-full flex flex-wrap items-center justify-center gap-2 md:gap-4 p-2'>
                {trail.map((props, index) => (
                    <animated.div key={index} style={props}>
                        <FeatureIndividual data={features[index]} />
                    </animated.div>
                ))}
            </div>
        </Element>
    );
};

export default Features;
