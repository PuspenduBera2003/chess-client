import React, { useEffect, useState } from "react"
import CommentCard from "./CommentCard"
import InfiniteScroll from "react-infinite-scroll-component";
import fetchFeedbacks from "../../../../api/fetchFeedback";
import CommentSkeleton from "./CommentSkeleton";

const skeletons = [1, 2, 3, 4]

const fetchMoreSkeleton = [1, 2, 3, 4, 5, 6]

const Comment = () => {

    const [offset, setOffset] = useState(6);

    const [feedbacks, setFeedbacks] = useState(null);

    const [totalResult, settotalResult] = useState(0);

    const fetchFeedback = async () => {
        const response = await fetchFeedbacks(0);
        setFeedbacks(response.feedbacks)
        settotalResult(response.totalResult)
    }

    const fetchMoreFeedback = async () => {
        setOffset(offset + 6);
        const response = await fetchFeedbacks(offset);
        settotalResult(response.totalResult)
        const newFeedbacks = feedbacks.concat(response.feedbacks)
        setFeedbacks(newFeedbacks)
    }

    useEffect(() => {
        fetchFeedback();
    }, [])

    return (
        <div className='flex items-center justify-center gap-6 flex-wrap my-2 w-full'>
            {
                feedbacks ? (
                    <div className="w-full">
                        <InfiniteScroll
                            dataLength={feedbacks.length}
                            next={fetchMoreFeedback}
                            hasMore={feedbacks.length < totalResult}
                            loader={
                                <div className="flex flex-wrap gap-3 items-center justify-center mt-3">
                                    {fetchMoreSkeleton.map((skeleton) => (
                                        <div className="w-full px-8" key={skeleton}>
                                            <CommentSkeleton />
                                        </div>
                                    ))}
                                </div>
                            }
                        >
                            <div className="flex flex-col gap-3 items-center justify-center w-full">
                                {
                                    feedbacks.map((feedback, index) => (
                                        <div className="w-full px-8" key={index}>
                                            <CommentCard feedback={feedback} />
                                        </div>
                                    ))
                                }
                            </div>
                        </InfiniteScroll>
                    </div>

                )
                    :
                    (
                        <div className="flex flex-wrap gap-3 items-center justify-center">
                            {skeletons.map((skeleton) => (
                                <div className="w-full px-8" key={skeleton}>
                                    <CommentSkeleton />
                                </div>
                            ))}
                        </div>
                    )
            }
        </div>
    )
}
export default Comment