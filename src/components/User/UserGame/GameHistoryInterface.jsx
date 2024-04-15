import React, { useEffect, useState } from 'react'
import HistoryIndividual from './HistoryIndividual'
import HistorySkeleton from './HistorySkeleton'
import fetchGameHistory from '../../../api/fetchGameHistory';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import updateShowBotomToast from '../../../redux/Auth/Actions/showBottomToast';
import MobileHistoryIndividual from './MobileHistoryIndividual';
import MobileHistorySkeleton from './MobileHistorySkeleton';
import chessGif from '../../../static/images/chess-gif.webp'
import { useNavigate } from 'react-router-dom';

const GameHistoryInterface = () => {

    const navigate = useNavigate();

    const [offset, setOffset] = useState(6);

    const [games, setGames] = useState(null);

    const [totalResult, settotalResult] = useState(0);

    const dispatch = useDispatch();

    const fetchMoreSkeleton = [1, 2, 3, 4]

    const skeletons = [1, 2, 3]

    const fetchHistory = async () => {
        const response = await fetchGameHistory(0);
        if (!response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: response.error }));
            return;
        }
        setGames(response.history)
        settotalResult(response.history)
    }

    const fetchMoreHistory = async () => {
        setOffset(offset + 6);
        const response = await fetchGameHistory(offset);
        settotalResult(response.history)
        const newHistory = games.concat(response.history)
        setGames(newHistory)
    }

    useEffect(() => {
        fetchHistory();
    }, [])

    return (
        <div className='flex flex-col justify-center items-center gap-2 w-full m-2'>
            {
                games ? (
                    <div className='w-full'>
                        <InfiniteScroll
                            dataLength={games.length}
                            next={fetchMoreHistory}
                            hasMore={!!totalResult.length}
                            loader={
                                <div className="flex flex-wrap gap-3 items-center justify-center mt-3">
                                    {fetchMoreSkeleton.map((skeleton) => (
                                        <div className="w-full px-8" key={skeleton}>
                                            <div className='hidden lg:block w-full'>
                                                <HistorySkeleton />
                                            </div>
                                            <div className='block lg:hidden w-full'>
                                                <MobileHistorySkeleton />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                        >
                            <div className="flex flex-col gap-3 items-center justify-center w-full">
                                {
                                    games.length > 0 ?
                                        games.map((game, index) => (
                                            <div className="w-full px-8" key={index}>
                                                <div className='hidden lg:block w-full'>
                                                    <HistoryIndividual game={game} />
                                                </div>
                                                <div className='block lg:hidden w-full'>
                                                    <MobileHistoryIndividual game={game} />
                                                </div>
                                            </div>
                                        ))
                                        :
                                        <div className='flex max-w-96 flex-col items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-900 shadow-lg'>
                                            <img src={chessGif} className='w-96 rounded-t-lg' alt="play chess" />
                                            <span className='w-full p-2 border-l border-r text-black dark:text-white text-center dark:border-gray-500 text-sm'>
                                                Seems like you've not played any online game. Please play an online game to view game history.
                                            </span>
                                            <div className='w-full p-2 flex items-center justify-center border-l border-r rounded-b-lg border-b dark:border-gray-500'>
                                                <button
                                                    onClick={() => navigate('/game/play-with-friends')}
                                                    type="button"
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    Play Online Game
                                                </button>
                                            </div>
                                        </div>
                                }
                            </div>
                        </InfiniteScroll>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        {skeletons.map((skeleton) => (
                            <div className="w-full px-8" key={skeleton}>
                                <div className='hidden lg:block w-full'>
                                    <HistorySkeleton />
                                </div>
                                <div className='block lg:hidden w-full'>
                                    <MobileHistorySkeleton />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}

export default GameHistoryInterface
