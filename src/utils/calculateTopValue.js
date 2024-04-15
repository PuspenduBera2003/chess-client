const calculateTopValue = (width) => {
    if (width > 960) {
        return 130;
    } else if (width > 768) {
        return 180;
    } else if (width > 690) {
        return 130;
    } else if (width > 370) {
        return 200;
    } else if (width > 290) {
        return 240;
    } else if (width > 240) {
        return 275;
    } else if (width > 225) {
        return 330;
    } else {
        return 440;
    }
};

export default calculateTopValue