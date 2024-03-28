import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast';
import { updateFeedback } from '../../../../api/submitFeedback';
import FeedbackSubmitted from './FeedbackSubmitted';
import HoverRating from './HoverRating';

const UpdateTextBox = (props) => {

    const rating = useSelector(state => state.Auth.userRating);

    const theme = useSelector(state => state.Theme.currentTheme);

    const dispatch = useDispatch();

    const [comment, setComment] = useState(props.comment);

    const maxLength = 500;

    const [submitted, setSubmitted] = useState(false);

    const handleCommentChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= maxLength) {
            setComment(inputValue);
        }
    };

    const handleUpdateComment = async (e) => {
        e.preventDefault();
        if (!rating) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Please give some rating!!' }))
        }
        else if (!comment) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Please write something!!' }))
        }
        else {
            dispatch(updateShowBotomToast({ show: true, type: 'loading', message: 'Updating feedback...' }))
            const response = await updateFeedback(rating, comment);
            if (response.success) {
                dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Feedback updated successfully' }))
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
                    (<div className="flex flex-col gap-5 items-center justify-center">
                        <HoverRating rating={props.rating} />
                        <form className='w-full'>
                            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div className="w-full px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                    <label htmlFor="comment" className="sr-only">Your comment</label>
                                    <textarea
                                        id="comment"
                                        rows="4"
                                        className="w-full text-justify px-0 h-50 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                        placeholder="Write a feedback..."
                                        value={comment}
                                        onChange={handleCommentChange}
                                        style={{ resize: 'none' }}
                                    ></textarea>
                                </div>
                                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                    <button
                                        onClick={handleUpdateComment}
                                        type="submit"
                                        className={`inline-flex items-center py-2.5 px-4 text-sm text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ${(comment === props.comment) ? 'pointer-events-none' : 'pointer-events-auto'}`}>
                                        Update Feedback
                                    </button>
                                    <p className={`text-sm rounded-md border dark:border-gray-600 py-0.5 px-1 ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-200'} text-gray-900 dark:text-gray-200 right-2`}>{comment.length}/{maxLength}</p>
                                </div>
                            </div>
                        </form>
                        <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
                    </div>)
                    :
                    (<FeedbackSubmitted type='updated' />)
            }
        </div>
    )
}

export default UpdateTextBox
