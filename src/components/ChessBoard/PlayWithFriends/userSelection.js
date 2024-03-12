const optionsArray = [ 'white', 'black'];

const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

const selection = (userSelection) => {
    switch(userSelection) {
        case 'White':
            return 'white';
        case 'Black':
            return 'black';
        case 'Random':
            const randomOption = getRandomItem(optionsArray);
            return randomOption;
        default:
            return
    }
}

export default selection;