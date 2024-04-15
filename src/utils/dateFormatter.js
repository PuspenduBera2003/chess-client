const dateFormatter = (timestamp) => {
    const dateTime = new Date(timestamp);

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(dateTime.getDate()).padStart(2, '0');

    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}:${month}:${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return {date: formattedDate, time: formattedTime}
}

export default dateFormatter;