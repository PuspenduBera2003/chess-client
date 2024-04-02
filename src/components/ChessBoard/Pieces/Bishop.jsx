import React from 'react'
import blackBishop from '../../../static/images/pieces/bB.png'
import whiteBishop from '../../../static/images/pieces/wB.png'

const Bishop = (props) => {
    const { color } = props;
    return (
        <div>
            {
                (color === 'b') ?
                    <img src={blackBishop} className='w-5 h-5' alt="bishop" />
                    :
                    <img src={whiteBishop} className='w-5 h-5' alt="bishop" />
            }
        </div>
    )
}

export default Bishop
