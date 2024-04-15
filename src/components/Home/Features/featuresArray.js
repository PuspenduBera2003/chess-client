import chessBoard1 from '../../../static/images/chessboard2.jpg'
import chessBoard2 from '../../../static/images/chessboard3.jpeg'
import chessBoard3 from '../../../static/images/chessboard4.png'
import chessBoard4 from '../../../static/images/chessboard5.jpg'

const features = [
    {
        name: "Pass & Play",
        image: chessBoard1,
        description: "This is the option which enables to play you with a friend or relative offline using one device only!",
        url: "/game/passplay",
        button: "Pass & Play"
    },
    {
        name: "Play Against Bot",
        image: chessBoard2,
        description: "This is the option which enables to play you with a trained computer bot, you can choose the level as well, there are three levels, beginner, intermedium, expert!",
        url: "/game/play-vs-computer",
        button: "Play Against Bot"
    },
    {
        name: "Play Against Friends Online",
        image: chessBoard3,
        description: "This is the option which enables to play you against your friend online. We will provide you a code. Using that code, both of you can join the game!",
        url: "/game/play-with-friends",
        button: "Play Against Friend"
    },
    {
        name: "Play Against Random Player",
        image: chessBoard4,
        description: "This is the option which enables to play you against a random player available in our server!",
        url: "/game/random-game",
        button: "Random Match"
    },
];

export default features;