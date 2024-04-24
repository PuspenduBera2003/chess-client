import { Link } from "react-router-dom"

const qnA = [
    {
        Q: "Do I have to set an account to access all kinds of game features ?",
        A: (
            <div>
                You can utilize all kinds of game features on ChessHub without set up  your user account, except for the <Link to="/game/play-with-friends" className="text-blue-700 dark:text-blue-500 font-semibold">Play With Friends (In App Invitation)</Link> functionality.
            </div>
        )
    },
    {
        Q: "What are the different types of games available on ChessHub ?",
        A: (
            <div>
                At present, ChessHub provides access to four distinct game modes:
                <ol>
                    <li>
                        <Link to='/game/passplay'>1. <span className="text-blue-700 dark:text-blue-500 font-semibold">Pass & Play</span></Link>
                    </li>
                    <li>
                        <Link to='/game/play-vs-computer'>2. <span className="text-blue-700 dark:text-blue-500 font-semibold">Play Vs Bot</span></Link>
                    </li>
                    <li>
                        <Link to='/game/play-with-friends'>3. <span className="text-blue-700 dark:text-blue-500 font-semibold">Play Vs Friend (via Link Generation or In App Invitation)</span></Link>
                    </li>
                    <li>
                        <Link to='/game/random-game'>4. <span className="text-blue-700 dark:text-blue-500 font-semibold">Play Vs Random Player</span></Link>
                    </li>
                </ol>
            </div>
        )
    },
    {
        Q: "Can I customize game duration on ChessHub ?",
        A: (
            <div>
                Currently, ChessHub features a standard game duration of 30 minutes across all online game types in its current version. Stay tuned, as we plan to introduce the option to customize game durations in upcoming versions.
            </div>
        )
    },
    {
        Q: "Can I change my credentials after creating an account ?",
        A: (
            <div>
                Certainly! You have the option to update your password and profile picture after creating an account on ChessHub. However, note that changing your username or email address is not permitted.
            </div>
        )
    },
    {
        Q: "How to reach ChessHub developers ?",
        A: (
            <div>
                To reach out to the developers, you can either visit the <Link to='/about-us' className="text-blue-700 dark:text-blue-500 font-semibold">About Us</Link> section on the website or send an email to <a className="text-blue-700 dark:text-blue-500 font-semibold" href="mailto:chesshub.authentication@gmail.com">chesshub.authentication@gmail.com</a>.
            </div>
        )
    }
]

export default qnA