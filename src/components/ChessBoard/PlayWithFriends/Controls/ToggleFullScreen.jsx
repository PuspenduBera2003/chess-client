import React from 'react';
import { requestFullscreen, handleFullscreenChange, exitFullscreen } from "../../../../utils/toggleFullScreen";

const ToggleFullScreen = (props) => {

    const { isFullscreen, setIsFullscreen, fullscreenDivRef } = props.data;

    const handleFullscreenChangeWrapper = () => handleFullscreenChange(setIsFullscreen);

    return (
        <button
            onClick={() => {
                if (isFullscreen) {
                    exitFullscreen(setIsFullscreen);
                } else {
                    requestFullscreen(fullscreenDivRef.current, setIsFullscreen, handleFullscreenChangeWrapper);
                }
            }}
            className="w-full h-full relative inline-flex items-center justify-center text-sm font-medium group">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md group-hover:bg-opacity-0 text-gray-800 dark:text-gray-100">
                Toggle Fullscreen
                {
                    isFullscreen ?
                        <i className="fa-solid fa-minimize ml-2"></i> :
                        <i className="fa-solid fa-maximize ml-2"></i>
                }
            </span>
        </button>
    )
}

export default ToggleFullScreen
