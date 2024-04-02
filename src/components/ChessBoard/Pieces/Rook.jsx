import React from 'react'
import blackRook from '../../../static/images/pieces/bR.png'
import whiteRook from '../../../static/images/pieces/wR.png'

const Rook = (props) => {
    const { color } = props;
    return (
        <div>
            {
                (color === 'b') ?
                    <img src={blackRook} className='w-5 h-5' alt="rook" />
                    :
                    <img src={whiteRook} className='w-5 h-5' alt="rook" />
            }
        </div>
    )
}

export default Rook
