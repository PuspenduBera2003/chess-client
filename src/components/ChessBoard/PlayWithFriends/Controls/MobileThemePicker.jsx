import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import updateBoardTheme from '../../../../redux/MultiPlayer/Actions/updateBoardTheme'

const MobileThemePicker = () => {
    const dispatch = useDispatch()

    const boardTheme = useSelector(state => state.MultiPlayer.boardTheme);

    const handleChangeTheme = (theme) => {
        dispatch(updateBoardTheme(theme))
    }

    return (
        <div data-popover role="tooltip" className="absolute z-10 inline-block w-32 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white text-center">Board Theme</h3>
            </div>
            <div className="px-3 py-2 flex flex-row flex-wrap items-center justify-center gap-2">
                <div onClick={() => handleChangeTheme('classic')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'classic' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#050505', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#e0e0e0', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('light')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'light' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#779952', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#edeed1', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('dark')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'dark' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: 'rgb(30 41 59)', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: 'rgb(100 116 139)', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('wooden')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'wooden' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#B58863', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#F0D9B5', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('brown')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'brown' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#7a4440', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#dbbbb8', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('blue')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'blue' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#05324d', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#8fc4e3', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('violet')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'violet' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#210247', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#cdb5eb', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('green')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'green' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#01520c', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#bbf2c2', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
                <div onClick={() => handleChangeTheme('blue2')} className={`classic flex flex-row gap-0 cursor-pointer border-2 dark:border-gray-600 rounded-md ${boardTheme === 'blue2' ? 'ring-2 ring-blue-600' : 'ring-0'}`}>
                    <div className='h-6 w-3' style={{ backgroundColor: '#01033b', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}></div>
                    <div className='h-6 w-3' style={{ backgroundColor: '#cbccf7', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}></div>
                </div>
            </div>
        </div>
    )
}

export default MobileThemePicker
