import React from 'react'
import blackQueen from '../../../static/images/pieces/bQ.png'
import whiteQueen from '../../../static/images/pieces/wQ.png'

const Queen = (props) => {
    const { color } = props;
    return (
        <div>
            {
                (color === 'b') ?
                    <img src={blackQueen} className='w-5 h-5' alt="queen" />
                    :
                    <img src={whiteQueen} className='w-5 h-5' alt="queen" />
            }
        </div>
    )
}

export default Queen