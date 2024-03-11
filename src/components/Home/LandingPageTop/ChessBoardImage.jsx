import React from 'react'
import { animated, useSpring } from 'react-spring';
import chessImage from '../../../static/images/chessboard1.png';

const ChessBoardImage = () => {
    const pulsate = useSpring({
        from: { transform: 'scale(0.8)' },
        to: [
            { transform: 'scale(1)' },
            { transform: 'scale(0.8)' },
            { transform: 'scale(1)' },
            { transform: 'scale(0.8)' },
            { transform: 'scale(1)' },
            { transform: 'scale(0.8)' },
            { transform: 'scale(1)' },
            { transform: 'scale(0.8)' },
            { transform: 'scale(1)' },
        ],
        config: { duration: 3000, loop: true },
    });
    return (
        <animated.img src={chessImage} alt="Chess Board" className="w-64 h-64" style={pulsate} />
    )
}

export default ChessBoardImage
