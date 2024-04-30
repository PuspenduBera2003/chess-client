import React from 'react'
import Back from './Buttons/Back'
import Current from './Buttons/Current'
import Forward from './Buttons/Forward'

const MobileControls = (props) => {

    return (
        <div className="inline-flex rounded-md shadow-sm items-center justify-center w-full" role="group">

                <div>
                    <Back />
                    <Current />
                    <Forward />
                </div>
        </div>
    )
}

export default MobileControls
