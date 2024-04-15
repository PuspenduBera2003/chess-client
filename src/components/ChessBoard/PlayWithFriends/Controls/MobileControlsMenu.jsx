import React, { useState } from 'react'
import MobileControlsLayout from './MobileControlsLayout';
import MobileThemePicker from './MobileThemePicker';

const MobileControlsMenu = (props) => {

    const [open, setOpen] = useState(false);
    const [openTheme, setOpenTheme] = useState(false)

    const handleClick = () => {
        if (openTheme) setOpenTheme(false)
        if (open) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }

    const handleOpenTheme = () => {
        if (open) setOpen(false);
        if (openTheme) {
            setOpenTheme(false)
        } else {
            setOpenTheme(true);
        }
    }

    return (
        <>
            <div>
                <button type="button"
                    onClick={handleClick}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700" style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                >
                    <svg className="w-3 h-3 text-gray-950 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: 2 }} fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                    </svg>
                </button>
                <button
                    style={{ borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
                    type='button'
                    onClick={handleOpenTheme}
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700">
                    <i className="fa-solid fa-palette"></i>
                </button>
            </div>
            {
                open &&
                <div className='absolute w-36 z-30' style={{ bottom: 33 }}>
                    <MobileControlsLayout data={props.data} />
                </div>
            }
            {
                openTheme &&
                <div className='absolute w-32 z-30' style={{ bottom: 187 }}>
                    <MobileThemePicker />
                </div>
            }
        </>
    )
}

export default MobileControlsMenu
