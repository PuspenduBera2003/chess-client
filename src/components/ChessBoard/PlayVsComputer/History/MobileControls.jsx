import React from 'react'
import { useSelector } from 'react-redux';
import Back from './Buttons/Back';
import Current from './Buttons/Current';
import Forward from './Buttons/Forward';

const MobileControls = () => {

    const botHistory = useSelector(state => state.Bot.botHistory);

    return (
        <div className="inline-flex rounded-md shadow-sm items-center justify-center w-full" role="group">
            {
                (botHistory.length > 1) &&
                (
                    <div>
                        <Back />
                        <Current />
                        <Forward />
                    </div>
                )
            }
        </div>
    )
}

export default MobileControls
