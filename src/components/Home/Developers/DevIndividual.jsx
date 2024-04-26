import React, { useState } from 'react'
import './Developers.css';
import NorthWestIcon from '@mui/icons-material/NorthWest';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { useSelector } from 'react-redux'
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

const DevIndividual = (props) => {

    const { developer } = props;

    const [leftContainerActive, setLeftContainerActive] = useState(false);

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const cardSpring = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(-100px)',
        config: { mass: 1, tension: 500, friction: 25 },
    });

    const handleArrClick = () => {
        setLeftContainerActive(true);
    };

    const handleCancelClick = () => {
        setLeftContainerActive(false);
    };

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const arrowContainer = (currentTheme === "dark")
        ? 'dark-dev-arrow-container'
        : 'light-dev-arrow-container';

    const devContainer = (currentTheme === "dark")
        ? 'dark-dev-container'
        : 'light-dev-container';

    return (
        <div>
            <animated.div
                style={cardSpring}
                ref={ref}
                className={`dev-center py-5 ${leftContainerActive ? 'left-container-active' : ''}`}>
                <div
                    className={`dev-box dev-center ${devContainer} ${currentTheme === "dark" ? 'dark-mode-shadow' : ''} border`}>
                    <img
                        src={developer.image}
                        alt={developer.name}
                        className={`${leftContainerActive ? 'low-opacity' : 'full-opacity'} ${currentTheme === "dark" ? 'grayscale' : 'grayscale-0'} ring-4 ring-gray-800 dark:ring-gray-500`}
                    />
                    <div className={`${leftContainerActive ? 'low-opacity' : 'full-opacity'} flex flex-col items-center justify-center`}>
                        <p className="user_name dark:text-white">
                            {developer.name}
                        </p>
                        <p className="skill dark:text-white">
                            {developer.role}
                        </p>
                    </div>
                    {<div className={`arr_container ${arrowContainer} dark:text-white dev-center`} onClick={handleArrClick}>
                        <SouthEastIcon />
                    </div>}
                    <div className={`left_container ${leftContainerActive ? 'active' : 'off'}`}>
                        <p className='font-serif font-bold text-center dark:text-white'>
                            SKILLS
                        </p>
                        <div className="skills flex items-center justify-center flex-wrap">
                            {developer.skills.map((skill, index) => (
                                <span className='border-0' key={index}>
                                    {skill.website !== '/#' ? (
                                        <a
                                            href={skill.website}
                                            target={'_blank'}
                                            rel="noopener noreferrer"
                                            key={index}
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                {skill.skillName}
                                            </span>
                                        </a>
                                    ) : (
                                        <span
                                            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 cursor-not-allowed"
                                        >
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                {skill.skillName}
                                            </span>
                                        </span>
                                    )}
                                </span>

                            ))}
                        </div>
                        <div className="icons dark:text-white">
                            <a href={developer.profiles.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fa-brands fa-github" ></i>
                            </a>
                            {
                                developer.profiles.facebook ?
                                    <a href={developer.profiles.facebook} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <i className="fa-brands fa-facebook"></i>
                                    </a>
                                    :
                                    <span style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <i className="fa-brands fa-facebook"></i>
                                    </span>
                            }
                            <i className="fa-brands fa-x-twitter"></i>
                            <a href={developer.profiles.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </div>
                        <div className={`${arrowContainer} dark:text-white cancel dev-center`} onClick={handleCancelClick}>
                            <NorthWestIcon />
                        </div>
                    </div>
                </div>
            </animated.div>
        </div>
    )
}

export default DevIndividual
