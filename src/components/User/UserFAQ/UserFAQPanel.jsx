import React, { useState } from "react";
import qnA from "./UserFAQArray";
import { useTrail, animated } from 'react-spring';

export default function UserFAQPanel() {
    const openArray = new Array(qnA.length).fill(false);
    const [open, setOpen] = useState(openArray);

    const handleToggleClick = (index) => {
        setOpen(prevOpen => ({ ...prevOpen, [index]: !prevOpen[index] }));
    }

    const trail = useTrail(qnA.length, {
        from: { opacity: 0, transform: 'translateY(-200px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { mass: 1, tension: 500, friction: 25 },
    });

    return (
        <div className="w-full m-2 h-full flex flex-col items-center justify-start p-3 gap-3 flex-start">
            {trail.map((props, index) => (
                <animated.div key={index} style={{ ...props }} className="w-full">
                    <h2 className="w-full">
                        <button onClick={() => handleToggleClick(index)} type="button" className="w-full flex items-center justify-between p-5 font-medium rtl:text-right text-gray-800 border border-b border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 gap-3">
                            <span className="w-full font-medium text-start">{qnA[index].Q}</span>
                            <svg className={`w-3 h-3 shrink-0 transition-all ${open[index] ? 'rotate-0' : 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                            </svg>
                        </button>
                    </h2>
                    <div className={`${open[index] ? 'block rounded-b-xl' : 'hidden'}`}>
                        <div className="p-5 border border-b rounded-b-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                            <div className="mb-2 text-gray-800 dark:text-gray-200">{qnA[index].A}</div>
                        </div>
                    </div>
                </animated.div>
            ))}
        </div>
    );
}