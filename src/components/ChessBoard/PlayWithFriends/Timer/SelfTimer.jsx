import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;

const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6
};

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;

export default function SelfTimer() {
    const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
    const endTime = stratTime + 243248; // use UNIX timestamp in seconds

    const remainingTime = endTime - stratTime;

    return (
        <div className="flex flex-row items-center justify-center font-semibold" style={{color: '#218380'}}>
            <CountdownCircleTimer
                {...timerProps}
                colors="#218380"
                duration={hourSeconds}
                initialRemainingTime={remainingTime % hourSeconds}
                onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds
                })}
                strokeWidth={0}
                size={30}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime(getTimeMinutes(hourSeconds - elapsedTime))}
                    </span>
                )}
            </CountdownCircleTimer>
            :
            <CountdownCircleTimer
                {...timerProps}
                colors="#218380"
                duration={minuteSeconds}
                initialRemainingTime={remainingTime % minuteSeconds}
                onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > 0
                })}
                strokeWidth={0}
                size={30}
            >
                {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                        {renderTime(getTimeSeconds(elapsedTime))}
                    </span>
                )}
            </CountdownCircleTimer>
        </div>
    );
}
