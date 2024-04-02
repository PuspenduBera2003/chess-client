const responsiveBoard = (screenWidth) => {
    let newBoardWidth;
    switch (true) {
        case screenWidth < 75:
            newBoardWidth = 30;
            break;
        case screenWidth < 100:
            newBoardWidth = 60;
            break;
        case screenWidth < 125:
            newBoardWidth = 90;
            break;
        case screenWidth < 150:
            newBoardWidth = 120;
            break;
        case screenWidth < 180:
            newBoardWidth = 140;
            break;
        case screenWidth < 210:
            newBoardWidth = 175;
            break;
        case screenWidth < 230:
            newBoardWidth = 200;
            break;
        case screenWidth < 265:
            newBoardWidth = 225;
            break;
        case screenWidth < 290:
            newBoardWidth = 260;
            break;
        case screenWidth < 330:
            newBoardWidth = 280;
            break;
        case screenWidth < 360:
            newBoardWidth = 325;
            break;
        case screenWidth < 390:
            newBoardWidth = 350;
            break;
        case screenWidth < 420:
            newBoardWidth = 380;
            break;
        default:
            newBoardWidth = 400;
            break;
    }
    return newBoardWidth;
}

export default responsiveBoard