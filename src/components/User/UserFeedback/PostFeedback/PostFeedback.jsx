import React, { useEffect, useState } from 'react'
import Textbox from './Textbox'
import checkFeedbackStatus from '../../../../api/checkFeedbackStatus'
import OwnCommentCard from './OwnCommentCard'

const PostFeedback = () => {

    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    const fetchFeedbackStatus = async () => {
        const response = await checkFeedbackStatus();
        if (response.success) {
            setComment(response.comment)
            setRating(response.rating)
        }
    }

    useEffect(() => {
        fetchFeedbackStatus();
    }, [])

    return (
        <div>
            {
                (!comment && !rating) ?
                    (
                            <Textbox comment='' />
                    )
                    :
                    (
                        <OwnCommentCard comment={comment} rating={rating} />
                    )
            }
        </div>
    )
}

export default PostFeedback
