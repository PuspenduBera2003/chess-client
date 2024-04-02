import React from 'react'
import blackKnight from '../../../static/images/pieces/bN.png'
import whiteKnight from '../../../static/images/pieces/wN.png'

const Knight = (props) => {
    const { color } = props;
    return (
        <div>
            {
                (color === 'b') ?
                    <img src={blackKnight} className='w-5 h-5' alt="knight" />
                    :
                    <img src={whiteKnight} className='w-5 h-5' alt="knight" />
            }
        </div>
    )
}

export default Knight
