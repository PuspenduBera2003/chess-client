import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import bot1 from '../../../static/images/bot1.jpg'
import bot2 from '../../../static/images/bot2.jpg'
import bot3 from '../../../static/images/bot3.jpeg'
import updateBotLevel from '../../../redux/Bot/Actions/updateBotLevel';

const BotSelector = () => {

    const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState(2);

    const onItemSelected = (item) => {
        setSelectedItem(item);
        dispatch(updateBotLevel(item))
    }

    const theme = useSelector(state => state.Theme.currentTheme);

    const selectedItemDesign = (theme === "dark") ? 'bg-blue-600' : 'bg-blue-500'

    return (
        <div className='flex flex-col items-center justify-center gap-3 mb-2'>
            <div className="flex flex-wrap gap-2">
                <div
                    onClick={() => onItemSelected(2)}
                    className={`p-1 rounded-lg ${selectedItem === 2 && selectedItemDesign}`}
                >
                    <figure className={`max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale-0 flex flex-col items-center justify-center gap-1 ${selectedItem === 2 ? 'grayscale-0' : 'grayscale'}`}>
                        <img className={`rounded-lg w-16 h-16 ${selectedItem === 2 && 'selected-image'}`} src={bot1} alt="RookRover" />
                        <figcaption className="text-sm px-2.5 rounded-lg font-semibold text-black dark:text-gray-300">
                            <p className={`${selectedItem === 2 && 'text-white'} text-sm`}>
                                RookRover
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <div
                    onClick={() => onItemSelected(8)}
                    className={`p-1 rounded-lg ${selectedItem === 8 && selectedItemDesign}`}
                >
                    <figure className={`max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale-0 flex flex-col items-center justify-center gap-1 ${selectedItem === 8 ? 'grayscale-0' : 'grayscale'}`}>
                        <img className={`rounded-lg w-16 h-16 ${selectedItem === 8 && "selected-image"}`} src={bot2} alt="BishopBrain" />
                        <figcaption className="text-sm px-2.5 rounded-lg font-semibold text-black dark:text-gray-300">
                            <p className={`${selectedItem === 8 && 'text-white'} text-sm`}>
                                BishopBrain
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <div
                    onClick={() => onItemSelected(18)}
                    className={`p-1 rounded-lg ${selectedItem === 18 && selectedItemDesign}`}>
                    <figure className={`max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale-0 flex flex-col items-center justify-center gap-1 ${selectedItem === 18 ? 'grayscale-0' : 'grayscale'}`}>
                        <img className={`rounded-lg w-16 h-16 ${selectedItem === 18 && 'selected-image'}`} src={bot3} alt="CheckWiz" />
                        <figcaption className="text-sm px-0 rounded-lg caption font-semibold text-black dark:text-gray-300">
                            <p className={`${selectedItem === 18 && 'text-white'} text-sm`}>
                                CheckWiz
                            </p>
                        </figcaption>
                    </figure>
                </div>
            </div>

        </div>
    )
}

export default BotSelector
