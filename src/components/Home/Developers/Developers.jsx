import React, { useState } from 'react';
import './Developers.css';
import { useSelector } from 'react-redux'
import NorthWestIcon from '@mui/icons-material/NorthWest';
import SouthEastIcon from '@mui/icons-material/SouthEast';

const Developers = () => {

    const [leftContainerActive, setLeftContainerActive] = useState(false);

    const skills = ['HTML', 'CSS', 'JavaScript', 'React'];

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
        <div className={`main dev-center py-5 ${leftContainerActive ? 'left-container-active' : ''}`}>
            <div className={`dev-box dev-center ${devContainer} ${currentTheme === "dark" ? 'dark-mode-shadow' : ''} border`}>
                <img
                    src="https://images.pexels.com/photos/1157970/pexels-photo-1157970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Puspendu Bera"
                    className={`${leftContainerActive ? 'low-opacity' : 'full-opacity'}`}
                />
                <div className={`${leftContainerActive ? 'low-opacity' : 'full-opacity'}`}>
                    <p className="user_name dark:text-white">
                        Puspendu Bera
                    </p>
                    <p className="skill dark:text-white">
                        Frontend Developer
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
                        {skills.map((skill, index) => (
                            <button
                                key={index}
                                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    {skill}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="icons dark:text-white">
                        <i className="fa-brands fa-github"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-x-twitter"></i>
                        <i className="fa-brands fa-linkedin"></i>
                    </div>
                    <div className={`${arrowContainer} dark:text-white cancel dev-center`} onClick={handleCancelClick}>
                        <NorthWestIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Developers;