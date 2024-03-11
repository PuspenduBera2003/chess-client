export default function getTimeGap(startTime, endTime) {
    const timeDifference = endTime - startTime;

    // Convert milliseconds to seconds
    const seconds = (Math.floor(timeDifference / 1000))%60;

    // Convert seconds to minutes
    const minutes = (Math.floor(timeDifference / 60000))%60;

    // Convert minutes to hours
    const hours = Math.floor(timeDifference / 3600000);

    // Return the result
    return({hours, minutes, seconds})
}