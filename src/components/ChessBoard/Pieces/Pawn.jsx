import React from 'react'
import blackPawn from '../../../static/images/pieces/bP.png'
import whitePawn from '../../../static/images/pieces/wP.png'

const Pawn = (props) => {
    const { color } = props;
    return (
        <div>
            {
                (color === 'b') ?
                    <img src={blackPawn} className='w-5 h-5' alt="pawn" />
                    :
                    <img src={whitePawn} className='w-5 h-5' alt="pawn" />
            }
        </div>
    )
}

export default Pawn
