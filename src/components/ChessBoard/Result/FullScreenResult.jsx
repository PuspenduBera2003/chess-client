import React from "react";
import { useSelector } from 'react-redux'
import MoveHistory from "./MoveHistory";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';

const FullScreenResult = (props) => {

    const { setWarning, history } = props

    const modalData = useSelector(state => state.PassPlay.modalData);

    const currentTheme = useSelector(state => state.Theme.currentTheme);

    const resultItemGradient = (currentTheme === "dark")
        ? 'dark-mode-feature-card'
        : 'from-lime-200 via-lime-400 to-lime-500';

    return (
        <div className={`absolute shadow-sm flex flex-col border dark:border-white items-center p-4 mb-4 text-gray-900 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-900 z-40`} style={{ width: 400, maxHeight: '100vh' }}>
                <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700 sticky" style={{ top: '0px' }} aria-label="Close" onClick={() => setWarning(false)}>
                    <span className="sr-only">Dismiss</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            <div className="flex flex-wrap p-2 gap-2 items-center justify-center flex-column" style={{ maxHeight: '100vh', overflow: 'auto' }}>
                <div className={`p-2 my-2 rounded border border-gray-300 text-gray-900 bg-gradient-to-r w-full shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-gray-600 ${resultItemGradient} text-center`}>
                    <h3 className='underline text-lg font-bold text-gray-950 dark:text-gray-300'>
                        Result
                    </h3>
                    <p className='font-semibold text-black dark:text-white'>
                        {modalData.result}
                    </p>
                </div>
                <div className={`p-2 mb-2 text-center rounded border border-gray-300 text-gray-900 bg-gradient-to-r shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-gray-600 ${resultItemGradient} w-full`}>
                    <h3 className='underline text-lg font-bold text-gray-950 dark:text-gray-300'>
                        Runtime
                    </h3>
                    <p className='font-semibold text-black dark:text-white'>
                        {modalData.matchRuntime.hours}:{modalData.matchRuntime.minutes}:{modalData.matchRuntime.seconds}
                    </p>
                </div>
                <div className='rounded w-full'>
                    <Accordion collapseAll>
                        <AccordionPanel>
                            <AccordionTitle className={`rounded border border-gray-300 bg-gradient-to-r text-gray-900 font-bold underline text-lg ${resultItemGradient}`}>
                                Moves
                            </AccordionTitle>
                            <AccordionContent>
                                <MoveHistory history={history} />
                            </AccordionContent>
                        </AccordionPanel>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default FullScreenResult