import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import updatePieceSelection from '../../../redux/MultiPlayer/Actions/updatePieceSelection';
import selection from './userSelection';

const PieceSelector = () => {

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();

    const onToggleDropdown = () => {
        setOpen(!open);
    }

    const onItemSelected = (item) => {
        setSelectedItem(item);
        setOpen(false);
        const userSelection = selection(item);
        dispatch(updatePieceSelection(userSelection));
    }

    return (
        <div>
            <button 
            onClick={onToggleDropdown}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
            type="button">
                {selectedItem || 'Select Piece'}
                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>
            <div 
            className={`z-10 ${open ? 'visible' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600`} 
            style={{ position: 'absolute', margin: '0px', top: '15rem', left: '4.3rem' }}>
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHelperRadioButton">
                    <li>
                        <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div className="flex items-center h-5">
                                <input id="helper-radio-4" 
                                name="helper-radio" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                onClick={() => onItemSelected('Random')} />
                            </div>
                            <div className="ms-2 text-sm">
                                <label htmlFor="helper-radio-4" className="font-medium text-gray-900 dark:text-gray-300">
                                    <div>Random</div>
                                </label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div className="flex items-center h-5">
                                <input id="helper-radio-5" name="helper-radio" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                onClick={() => onItemSelected('White')}/>
                            </div>
                            <div className="ms-2 text-sm">
                                <label htmlFor="helper-radio-5" className="font-medium text-gray-900 dark:text-gray-300">
                                    <div>White</div>
                                </label>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <div className="flex items-center h-5">
                                <input id="helper-radio-6" name="helper-radio" type="radio" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" 
                                onClick={() => onItemSelected('Black')}/>
                            </div>
                            <div className="ms-2 text-sm">
                                <label htmlFor="helper-radio-6" className="font-medium text-gray-900 dark:text-gray-300">
                                    <div>Black</div>
                                </label>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PieceSelector
