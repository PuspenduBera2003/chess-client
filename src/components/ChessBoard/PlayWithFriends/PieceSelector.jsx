import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import updatePieceSelection from '../../../redux/MultiPlayer/Actions/updatePieceSelection';
import selection from './userSelection';
import whiteKing from '../../../static/images/white_king.png'
import blackKing from '../../../static/images/black_king.png'
import randomKing from '../../../static/images/random.png'
import './PieceSelector.css'

const PieceSelector = () => {

    const [selectedItem, setSelectedItem] = useState("Random");
    const dispatch = useDispatch();

    const onItemSelected = (item) => {
        setSelectedItem(item);
        const userSelection = selection(item);
        dispatch(updatePieceSelection(userSelection));
    }

    const theme = useSelector(state => state.Theme.currentTheme);

    const selectedItemDesign = (theme === "dark") ? 'bg-blue-600' : 'bg-blue-500'

    useEffect(()=> {
        const userSelection = selection("Random");
        dispatch(updatePieceSelection(userSelection));
    },[])

    return (
        <div className='flex flex-col items-center justify-center gap-3 mb-2'>
            {/* <span className={`text-black text-xl text-bold me-2 px-2.5 py-0.5 rounded dark:text-gray-300 ms-2 text-center play-heading`}>
                I want to play as
            </span> */}
            <div className="flex flex-wrap gap-2">
                <div
                    onClick={() => onItemSelected("White")}
                    className={`p-1 rounded-lg ${selectedItem === "White" && selectedItemDesign}`}
                >
                    <figure className={`max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale-0 flex flex-col items-center justify-center gap-1 ${selectedItem === 'White' ? 'grayscale-0' : 'grayscale'}`}>
                        <img className={`rounded-lg w-16 h-16 ${selectedItem === "White" && 'selected-image'}`} src={whiteKing} alt="White" />
                        <figcaption className="text-sm px-2.5 rounded-lg font-semibold text-black dark:text-gray-300">
                            <p className={`${selectedItem === 'White' && 'text-white'}`}>
                                White
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <div
                    onClick={() => onItemSelected("Black")}
                    className={`p-1 rounded-lg ${selectedItem === "Black" && selectedItemDesign}`}
                >
                    <figure className={`max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale-0 flex flex-col items-center justify-center gap-1 ${selectedItem === 'Black' ? 'grayscale-0' : 'grayscale'}`}>
                        <img className={`rounded-lg w-16 h-16 ${selectedItem === "Black" && "selected-image"}`} src={blackKing} alt="Black" />
                        <figcaption className="text-sm px-2.5 rounded-lg font-semibold text-black dark:text-gray-300">
                            <p className={`${selectedItem === 'Black' && 'text-white'}`}>
                                Black
                            </p>
                        </figcaption>
                    </figure>
                </div>
                <div
                    onClick={() => onItemSelected("Random")}
                    className={`p-1 rounded-lg ${selectedItem === "Random" && selectedItemDesign}`}>
                    <figure className={`max-w-sm transition-all duration-300 cursor-pointer filter hover:grayscale-0 flex flex-col items-center justify-center gap-1 ${selectedItem === 'Random' ? 'grayscale-0' : 'grayscale'}`}>
                        <img className={`rounded-lg w-16 h-16 ${selectedItem === "Random" && 'selected-image'}`} src={randomKing} alt="Random" />
                        <figcaption className="text-sm px-0 rounded-lg caption font-semibold text-black dark:text-gray-300">
                            <p className={`${selectedItem === 'Random' && 'text-white'}`}>
                                Random
                            </p>
                        </figcaption>
                    </figure>
                </div>
            </div>

        </div>
    )
}

export default PieceSelector
