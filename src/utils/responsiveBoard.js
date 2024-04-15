const responsiveBoard = (screenWidth) => {
    let newBoardWidth;
    if (screenWidth < 75) {
        newBoardWidth = 30;
    } else if (screenWidth < 100 && screenWidth >= 75) {
        newBoardWidth = 60;
    } else if (screenWidth < 125 && screenWidth >= 100) {
        newBoardWidth = 90;
    } else if (screenWidth < 150 && screenWidth >= 125) {
        newBoardWidth = 120;
    } else if (screenWidth < 180 && screenWidth >= 150) {
        newBoardWidth = 140;
    } else if (screenWidth < 210 && screenWidth >= 180) {
        newBoardWidth = 175;
    } else if (screenWidth < 230 && screenWidth >= 210) {
        newBoardWidth = 200;
    } else if (screenWidth < 265 && screenWidth >= 230) {
        newBoardWidth = 225;
    } else if (screenWidth < 290 && screenWidth >= 265) {
        newBoardWidth = 260;
    } else if (screenWidth < 330 && screenWidth >= 290) {
        newBoardWidth = 280;
    } else if (screenWidth < 360 && screenWidth >= 330) {
        newBoardWidth = 325;
    } else if (screenWidth < 390 && screenWidth >= 360) {
        newBoardWidth = 350;
    } else if (screenWidth < 420 && screenWidth >= 390) {
        newBoardWidth = 380;
    } else {
        newBoardWidth = 400;
    }
    return newBoardWidth;
}

export default responsiveBoard;
