import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FeatureIndividual = (props) => {
    const navigate = useNavigate();

    const { data } = props

    const redirectToPassPlay = () => {
        navigate(`${data.url}`)
    }

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const isDarkMode = (currentTheme === "dark")
        ? 'dark-mode-feature-card'
        : 'light-mode-feature-card';

    return (
        <div className={`flex flex-col items-center ${isDarkMode} border dark:border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-xl dark:shadow-cyan-800/80`} to='/passplay'>
            <img className="object-cover w-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={data.image} alt={data.name} loading='lazy' />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {data.description}
                </p>
                <div className="flex item-center justify-center">
                    <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                        onClick={redirectToPassPlay}
                    >
                        {data.button}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeatureIndividual
