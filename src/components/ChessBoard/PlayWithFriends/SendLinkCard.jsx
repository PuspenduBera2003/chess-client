import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterval } from 'react-use';
import { useDispatch, useSelector } from 'react-redux'
import handleGenerateLink from '../../../api/handleGenerateLink';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import UserCard from './UserCard';
import URLCard from './URLCard';
import LinkSharer from './LinkSharer';
import { useSpring, animated } from 'react-spring';
import updateRemainingTime from '../../../redux/MultiPlayer/Actions/updateRemainingTime';
import socket from '../../../socket/socket';
import updateGameLink from '../../../redux/MultiPlayer/Actions/updateGameLink';
import PieceSelector from './PieceSelector';

const SendLinkCard = () => {

    const client = process.env.REACT_APP_HOST_CLIENT;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const remainingTime = useSelector(state => state.MultiPlayer.remainingTime);

    const selectedPiece = useSelector(state => state.MultiPlayer.pieceSelection);

    const socketId = useSelector(state => state.MultiPlayer.socketId);

    const userDetails = useSelector(state => state.Auth.userDetails);

    const [linkGenerated, setLinkGenerated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gameURL, setGameURL] = useState("");
    const isTabActive = useRef(true);

    const animationProps = useSpring({
        from: { transform: 'translateY(50px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
        config: { tension: 300, friction: 10 },
    });

    const linkGenerator = async () => {
        if (!selectedPiece) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Please select your piece' }));
            return;
        }
        setLoading(true);
        dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Generating URL' }));
        const response = await handleGenerateLink();
        setLoading(false);
        if (!response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: response.error }));
            return;
        }
        dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'URL generated successfully' }));
        const gameLink = `${client}/game/play-with-friends/${response.id}`;
        dispatch(updateGameLink(`/game/play-with-friends/${response.id}`));
        setLinkGenerated(true);
        setGameURL(gameLink);
        socket.emit("game-created", { room: response.uniqueId, socketId, userSelection: selectedPiece, userDetails });
    }

    const handlePlayWithFriend = () => {
        if(!userDetails) {
            dispatch(updateShowBotomToast({show: true, type: 'failure', message: 'You Are Not Authenticated'}));
            navigate('/auth/signin');            
        } else {
            navigate('/user/dashboard/friends')
        }
    }

    useInterval(() => {
        if (remainingTime > 0) {
            dispatch(updateRemainingTime(remainingTime - 1));
        }
    }, 1000);

    const handleVisibilityChange = () => {
        isTabActive.current = document.visibilityState === 'visible';
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <animated.div
            style={animationProps}
            className="w-96 py-2 m-2 px-1 bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center pb-10">
                {
                    !linkGenerated ?
                        <UserCard loading={loading} />
                        :
                        <URLCard url={gameURL} setLinkGenerated={setLinkGenerated} />
                }
                <div className="flex mt-4 md:mt-6">
                    {
                        !linkGenerated ?
                            <div className='flex flex-col justify-center items-center gap-3'>
                                <PieceSelector />
                                <div className='flex'>
                                    <button
                                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        onClick={linkGenerator}>
                                        Create Link
                                    </button>
                                    <button
                                    onClick={handlePlayWithFriend}
                                     className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        Play With Friend
                                    </button>
                                </div>
                            </div>
                            :
                            <LinkSharer url={gameURL} />
                    }
                </div>
            </div>
        </animated.div>
    )
}

export default SendLinkCard
