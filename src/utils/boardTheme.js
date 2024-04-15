const customBoardStyle = (theme) => {
    let boardStyle;
    switch(theme) {
        case 'dark':
            boardStyle = {
                customDarkSquareStyle: { backgroundColor: "rgb(30 41 59)" },
                customLightSquareStyle: { backgroundColor: "rgb(148 163 184)" },
                clickedSquareColor: 'rgb(71 85 105)',
                possibleMoves: 'radial-gradient(circle, rgba(255,255,255,.2) 25%, transparent 25%)'
            }
            break;
        case 'light':
            boardStyle = {
                customDarkSquareStyle: { backgroundColor: "#779952" },
                customLightSquareStyle: { backgroundColor: "#edeed1" },
                clickedSquareColor: 'rgba(197, 252, 3, 1)',
                possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)'
            }
            break;
        case 'wooden':
            boardStyle = {
                customDarkSquareStyle: {backgroundColor: '#B58863'},
                customLightSquareStyle: {backgroundColor: '#F0D9B5'},
                clickedSquareColor: 'rgba(255, 255, 0, 0.4)',
                possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)'
            }
            break;
        case 'brown':
            boardStyle = {
                customDarkSquareStyle: {backgroundColor: '#7a4440'},
                customLightSquareStyle: {backgroundColor: '#dbbbb8'},
                clickedSquareColor: '#ffa1af',
                possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.3) 25%, transparent 25%)'
            }
            break;
        case 'blue':
            boardStyle = {
                customDarkSquareStyle: {backgroundColor: '#05324d'},
                customLightSquareStyle: {backgroundColor: '#8fc4e3'},
                clickedSquareColor: '#0d6da6',
                possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.3) 25%, transparent 25%)'
            }
            break;
        case 'violet':
            boardStyle = {
                customDarkSquareStyle: {backgroundColor: '#210247'},
                customLightSquareStyle: {backgroundColor: '#cdb5eb'},
                clickedSquareColor: '#be7dfa',
                possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.3) 25%, transparent 25%)'
            }
            break;
        case 'green':
            boardStyle = {
                customDarkSquareStyle: {backgroundColor: '#01520c'},
                customLightSquareStyle: {backgroundColor: '#bbf2c2'},
                clickedSquareColor: '#52fa69',
                possibleMoves: 'radial-gradient(circle, rgba(0,0,0,.2) 25%, transparent 25%)'
            }
            break;
        case 'blue2':
            boardStyle = {
                customDarkSquareStyle: {backgroundColor: '#01033b'},
                customLightSquareStyle: {backgroundColor: '#cbccf7'},
                clickedSquareColor: '#7377ff',
                possibleMoves: 'radial-gradient(circle, rgba(255,255,255,.5) 25%, transparent 25%)'
            }
            break;
        default:
            boardStyle = {
                customDarkSquareStyle: { backgroundColor: "#050505"},
                customLightSquareStyle: { backgroundColor: "#e0e0e0"},
                clickedSquareColor: '#8d8f8f',
                possibleMoves: 'radial-gradient(circle, rgba(255,255,255,.8) 25%, transparent 25%)'
            }
    }
    return boardStyle;
}

export default customBoardStyle;