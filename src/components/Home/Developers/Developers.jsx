import React from 'react';
import { devArray } from './DevelopersArray';
import DevIndividual from './DevIndividual';

const Developers = () => {
    return (
        <div className='w-full flex flex-wrap items-center justify-center gap-6'>
            {devArray.map((result, index) => (
                <div key={index}>
                    <DevIndividual developer={result} />
                </div>
            ))}
        </div>
    );
};

export default Developers;