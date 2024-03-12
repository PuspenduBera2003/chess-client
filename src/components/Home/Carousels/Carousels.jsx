import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import './Carousels.css';
import illustration1 from '../../../static/images/king.png';
import illustration2 from '../../../static/images/playwithbot.png';
import illustration3 from '../../../static/images/playwithfriend.png';
import illustration4 from '../../../static/images/chessboard7.jpg';
import illustration5 from '../../../static/images/chessboard6.jpg';
import CarouselsHeader from './CarouselsHeader';

const Carousels = () => {
    const panelsRef = useRef([]);
    const [ref, inView] = useInView({ triggerOnce: true });

    const animationProps = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(150px)',
    });

    useEffect(() => {
        const panels = panelsRef.current;

        const removeActiveClasses = () => {
            panels.forEach((panel) => {
                panel.classList.remove('active');
            });
        };

        const handleClick = (panel) => {
            return () => {
                removeActiveClasses();
                panel.classList.add('active');
            };
        };

        panels.forEach((panel) => {
            panel.addEventListener('click', handleClick(panel));
        });
    }, []);

    return (
        <div className="flex flex-col justify-center">
            <CarouselsHeader />
            <div className="carousel-container" ref={ref}>
                <animated.div className="panel active" ref={(el) => (panelsRef.current[0] = el)} style={{ ...animationProps, backgroundImage: `url(${illustration1})` }}>
                    <h3>Pass & Play</h3>
                </animated.div>

                <animated.div className="panel" ref={(el) => (panelsRef.current[1] = el)} style={{ ...animationProps, backgroundImage: `url(${illustration2})` }}>
                    <h3>Play With Bots</h3>
                </animated.div>

                <animated.div className="panel" ref={(el) => (panelsRef.current[2] = el)} style={{ ...animationProps, backgroundImage: `url(${illustration3})` }}>
                    <h3>Play With Friend</h3>
                </animated.div>

                <animated.div className="panel" ref={(el) => (panelsRef.current[3] = el)} style={{ ...animationProps, backgroundImage: `url(${illustration4})` }}>
                    <h3>Play Online</h3>
                </animated.div>

                <animated.div className="panel" ref={(el) => (panelsRef.current[4] = el)} style={{ ...animationProps, backgroundImage: `url(${illustration5})` }}>
                    <h3>Learn Chess</h3>
                </animated.div>
            </div>
        </div>
    );
};

export default Carousels;