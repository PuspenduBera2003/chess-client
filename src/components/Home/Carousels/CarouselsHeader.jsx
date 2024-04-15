import React from 'react';
import { useSelector } from 'react-redux'
import { TypeAnimation } from 'react-type-animation';
import logo from '../../../static/images/logo.png'

const CarouselsHeader = () => {
    const currentTheme = useSelector((state) => state.Theme.currentTheme);

    const invertFilter = (currentTheme === "dark") ? 'invert(1)' : 'invert(0)';

    return (
        <div className='flex flex-wrap items-center justify-center flex-col gap-2 mt-1'>
            <div className='p-2 flex items-center justify-center'>
                <img
                    src={logo}
                    alt="King"
                    className='w-16 h-16'
                    style={{ filter: invertFilter }} />
                <h1 className='features-heading text-4xl md:text-7xl'>
                    Features
                </h1>
            </div>
            <TypeAnimation
                sequence={[
                    'Pass & Play',
                    1000,
                    'Play Against Bots',
                    1000,
                    'Play Online',
                    1000,
                    'Play Against Random Players',
                    1000,
                    'Learn Chess',
                    1000
                ]}
                speed={20}
                wrapper='span'
                style={{ fontSize: '3em', maxWidth: '420px', margin: 'auto', textAlign: 'center', marginBottom: '5px', fontFamily: '"Just Another Hand", cursive' }}
                repeat={Infinity}
                className=' text-indigo-800 dark:text-white'
            />
        </div>
    );
};

export default CarouselsHeader;
