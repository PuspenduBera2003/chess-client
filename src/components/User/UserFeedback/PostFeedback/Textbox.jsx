import React, { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import updateShowBotomToast from "../../../../redux/Auth/Actions/showBottomToast";
import { submitFeedback } from "../../../../api/submitFeedback";
import FeedbackSubmitted from "./FeedbackSubmitted";
import HoverRating from "./HoverRating";

const Textbox = (props) => {

    const rating = useSelector(state => state.Auth.userRating);

    const dispatch = useDispatch();

    const [comment, setComment] = useState(props.comment);

    const [submitted, setSubmitted] = useState(false);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handlePostComment = async (e) => {
        e.preventDefault();
        if (!rating) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Please give some rating!!' }))
        }
        else if (!comment) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Please write something!!' }))
        }
        else {
            const response = await submitFeedback(rating, comment);
            if (response.success) {
                dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Feedback submitted successfully' }))
                setSubmitted(true);
            } else {
                dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Something went wrong!!' }))
            }
        }
    }

    return (
        <div>
            {
                !submitted ?
                    <div className="w-full flex flex-col gap-5 items-center justify-center">
                        <HoverRating rating={5} />
                        <form className="w-full">
                            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div className="w-full px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea
                                        id="comment"
                                        rows="4"
                                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                        placeholder="Write a feedback..."
                                        value={comment}
                                        onChange={handleCommentChange}
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                    <button
                                        onClick={handlePostComment}
                                        type="submit"
                                        className={`inline-flex items-center py-2.5 px-4 text-sm text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ${(comment === props.comment) ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                                        Post Feedback
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                    </div>
                    :
                    (<FeedbackSubmitted type='submitted' />)
            }
        </div>
    )
}
export default Textbox