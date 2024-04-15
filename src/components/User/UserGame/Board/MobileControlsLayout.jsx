import React from 'react'
import { useSelector } from 'react-redux'
import Back from './Buttons/Back';
import Current from './Buttons/Current';
import Forward from './Buttons/Forward';

const MobileControlsLayout = () => {
    const gameHistory = useSelector(state => state.Auth.moveHistory);

    return (
        <div className="inline-flex rounded-md shadow-sm items-center justify-center w-full" role="group">
            {
                (gameHistory.length > 1) &&
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

export default MobileControlsLayout