import React from 'react'
import { useSelector } from 'react-redux'

const FeedbackSubmitted = (props) => {

  const userDetails = useSelector(state => state.Auth.userDetails);

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <i className="fa-solid fa-thumbs-up" style={{color: 'green', fontSize: '8rem'}} ></i>
      <span className='text-xl font-semibold text-black dark:text-white'>
        Thanks {userDetails.username}!!!
      </span>
      <span className='text-lg font-semibold text-black dark:text-white'>
        Your feedback {props.type} successfully.
      </span>
    </div>
  )
}

export default FeedbackSubmitted