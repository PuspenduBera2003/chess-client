import React from 'react'
import { useSpring, animated, config } from 'react-spring';
import WelcomeHeading from './WelcomeHeading';
import BouncingDiv from './BouncingDiv';
import ChessBoardImage from './ChessBoardImage';
import { Link } from 'react-scroll'; 
import TagLine from './TagLine';
import BackgroundVideo from './BackgroundVideo';

const LandingPageTop = () => {

    const fadeIn = useSpring({
        opacity: 1,
        from: { opacity: 0 },
        config: config.slow,
    });

    const slideIn = useSpring({
        from: { transform: 'translateY(-50px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: config.wobbly,
    });

    return (
        <animated.div
            style={{ ...fadeIn }}
            className="landing-page-top first:min-h-screen h-full flex flex-col items-center justify-center md:gap-0 overflow-hidden mb-3 md:mb-4 lg:mb-8 lg:shadow-lg lg:shadow-gray-800 p-2">
            <BackgroundVideo />
            <div className="max-w-screen-lg w-full p-2 rounded-lg flex items-center justify-center">
                <animated.div style={slideIn} className="w-full flex flex-col items-center justify-center">
                    <div className="flex justify-center">
                        <WelcomeHeading />
                    </div>
                    <div className="flex w-full items-center justify-center md:justify-between mb-4 lg:mb-2 flex-wrap gap-2">
                        <TagLine />
                        <div>
                            <ChessBoardImage />
                        </div>
                        <BouncingDiv />
                    </div>
                    <div className="flex justify-center items-center">
                        <Link to='features' smooth={true} duration={500} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer shadow-none lg:shadow-lg shadow-purple-500/50 dark:shadow-purple-800/80">
                            Get Started
                        </Link>
                    </div>
                </animated.div>
            </div>
        </animated.div>
    )
}

export default LandingPageTop
