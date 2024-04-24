import React, { useState } from "react"
import qnA from "./UserFAQArray"

export default function UserFAQPanel() {

    const openArray = new Array(qnA.length).fill(false);

    const [open, setOpen] = useState(openArray);

    const handleToggleClick = (index) => {
        if (!open[index]) {
            setOpen({ ...open, [index]: true })
        } else {
            setOpen({ ...open, [index]: false });
        }
    }
    
    return (
        <div className="w-full m-2 h-full flex flex-col itesm-center justify-start p-3 gap-3 flex-start">
            {qnA.map((val, index) =>
                <div className="w-full" key={index}>
                    <h2 className="w-full">
                        <button onClick={() => handleToggleClick(index)} type="button" className="w-full flex items-center justify-between p-5 font-medium rtl:text-right text-gray-800 border border-b border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3">
                            <span className="w-full font-medium text-start">{val.Q}</span>
                            <svg className={`w-3 h-3 shrink-0 transition-all ${open[index] ? 'rotate-0' : 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div className={`${open[index] ? 'block rounded-b-xl' : 'hidden'}`}>
                        <div className="p-5 border border-b rounded-b-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <div className="mb-2 text-gray-800 dark:text-gray-200">{val.A}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}