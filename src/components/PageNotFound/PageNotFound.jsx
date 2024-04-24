import React from 'react'
import { useSelector } from 'react-redux';
import logo from '../../static/images/logo.png'
import { Link } from 'react-router-dom';

const PageNotFound = () => {

    const currentTheme = useSelector((state) => state.Theme.currentTheme);

    const invertFilter = (currentTheme === "dark") ? 'invert(1)' : 'invert(0)';

    const gradientClasses = (currentTheme === "dark")
        ? 'dark-mode-landing-page'
        : 'light-mode-landing-page';

    return (
        <div className={`support bg-gradient-to-b p-3 ${gradientClasses} flex flex-col gap-4 items-center justify-center`}>
            <img
                src={logo}
                className="h-20 sm:h-32"
                alt="Chess Logo"
                style={{ filter: invertFilter }}
                loading='lazy'
            />
            <h1 className="text-4xl text-center font-bold mb-4 text-red-700 dark:text-red-400">404 - Page Not Found</h1>
            <p className="text-lg mb-8 text-center text-gray-800 dark:text-gray-200">The page you are looking for does not exist.</p>
            <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
                <Link to='/' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    <i className="fa-solid fa-house" style={{ fontSize: '1.2rem' }}></i>
                </Link>
                <Link to='/game' type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                    <i className="fa-solid fa-chess" style={{ fontSize: '1.2rem' }}></i>
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound
