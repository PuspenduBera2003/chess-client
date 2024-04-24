import chessBoard1 from '../../../static/images/chessboard2.jpg'
import chessBoard2 from '../../../static/images/chessboard3.jpeg'
import chessBoard3 from '../../../static/images/chessboard4.png'
import chessBoard4 from '../../../static/images/chessboard5.png'

const features = [
    {
        name: "Pass & Play",
        image: chessBoard1,
        description: "This option allows you to play with a offline player using just one device!",
        url: "/game/passplay",
        button: "Pass & Play"
    },
    {
        name: "Play Vs Bot",
        image: chessBoard2,
        description: "This option allows you to play against a trained computer bot. We have three bots: RookRover, BishopBrain, and CheckWiz!",
        url: "/game/play-vs-computer",
        button: "Play Vs Bot"
    },
    {
        name: "Play Vs Friend",
        image: chessBoard3,
        description: "This option allows you play against your friend online by generating a link or sending an in-app invitation!",
        url: "/game/play-with-friends",
        button: "Play Vs Friend"
    },
    {
        name: "Play Vs Random Player",
        image: chessBoard4,
        description: "This option allows you to play against a random player available on our server!",
        url: "/game/random-game",
        button: "Random Match"
    },
];

export default features;