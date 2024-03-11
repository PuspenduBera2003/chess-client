import React from 'react'
import chessVideo from '../../../static/video/chess_video5.mp4'

const BackgroundVideo = () => {
    return (
        <video
            autoPlay
            loop
            muted
            loading="lazy"
            className="absolute left-0 w-full hidden lg:block object-cover z-0 shadow-lg lg:shadow-gray-800"
            style={{ height: '90%', top: 60, opacity: 0.8 }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <source src={chessVideo} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}

export default BackgroundVideo
