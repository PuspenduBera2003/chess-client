import React from 'react';
import { devArray } from './DevelopersArray';
import DevIndividual from './DevIndividual';
import { useSelector } from 'react-redux'
import logo from '../../../static/images/logo.png'

const Developers = () => {

    const currentTheme = useSelector((state) => state.Theme.currentTheme);

    const invertFilter = (currentTheme === "dark") ? 'invert(1)' : 'invert(0)';

    return (
        <div>
            <div className='p-2 flex items-center justify-center flex-wrap'>
                <img
                    src={logo}
                    alt="King"
                    className='w-16 h-16'
                    style={{ filter: invertFilter }} />
                <h1 className='features-heading text-3xl sm:text-4xl md:text-7xl font-bold'>
                    Developers
                </h1>
            </div>
            <div className='w-full flex flex-wrap md:gap-6 items-center justify-center'>
                {devArray.map((result, index) => (
                    <div key={index}>
                        <DevIndividual developer={result} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Developers;