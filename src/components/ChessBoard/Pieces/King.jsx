import React from 'react'
import blackKing from '../../../static/images/pieces/bK.png'
import whiteKing from '../../../static/images/pieces/wK.png'

const King = (props) => {
    const { color } = props;
    return (
        <div>
            {
                (color === 'b') ?
                    <img src={blackKing} className='w-5 h-5' alt="king" />
                    :
                    <img src={whiteKing} className='w-5 h-5' alt="king" />
            }
        </div>
    )
}

export default King
