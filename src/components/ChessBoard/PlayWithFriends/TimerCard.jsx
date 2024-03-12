import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import timerImg from '../../../static/images/timer-icon.png'
import sadEmoji from '../../../static/images/sad_emoji.webp'
import { PulseLoader } from 'react-spinners'
import { useSelector } from 'react-redux'

const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
        return <div className="timer">
            <img src={sadEmoji} alt="Time Out" />
        </div>;
    }

    return (
        <div className="timer">
            <img src={timerImg} alt="timer" className="w-20" />
        </div>
    );
};

const TimerCard = () => {

    const remainingTime = useSelector(state => state.MultiPlayer.remainingTime);

    return (
        <div className="flex items-center justify-center gap-3 flex-col">
            <CountdownCircleTimer
                isPlaying
                duration={120}
                colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                colorsTime={[120, 60, 30, 0]}
                onComplete={() => ({ shouldRepeat: false, delay: 1 })}
                size={92}
                strokeWidth={5}
            >
                {renderTime}
            </CountdownCircleTimer>
            {
                (remainingTime !== 0) ?
                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-lg font-bold flex flex-col items-center justify-center">
                            <span>Waiting for Opponent</span>
                            <PulseLoader color="#36d7b7" size={10} className="mt-1" />
                        </div>
                        <div className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-xl font-bold">
                            {remainingTime}
                        </div>
                    </div>
                    :
                    <div>
                        <div className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-lg font-bold flex flex-col items-center justify-center">
                            <span>Link Expired!!</span>
                        </div>
                    </div>
            }
        </div>
    );
}

export default TimerCard