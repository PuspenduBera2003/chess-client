import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners'
import updateRemainingTime from '../../../redux/MultiPlayer/Actions/updateRemainingTime';

const UserCard = (props) => {
    const { loading } = props;
    const userDetails = useSelector(state => state.Auth.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateRemainingTime(120));
    })

    return (
        <div className='flex flex-col items-center'>
            {
                !loading ?
                    userDetails ?
                        <div className='flex flex-col items-center'>
                            <img className="w-24 h-24 mb-3 rounded-full shadow-lg ring-1 ring-gray-300 dark:ring-gray-500" src={userDetails.profile_photo} alt={userDetails.username} />
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                {userDetails.username}
                            </h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                {userDetails.email}
                            </span>
                        </div>
                        :
                        <div className='flex flex-col items-center gap-2'>
                            <svg className="text-gray-400 dark:text-gray-700 rounded-full ring-1 ring-gray-300 dark:ring-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style={{ width: 60, height: 60 }} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                Guest
                            </h5>
                            <Link to='/auth/signup' className="text-sm text-blue-700 dark:text-blue-500 font-semibold">
                                Create an account with us
                            </Link>
                        </div>
                    :
                    <MoonLoader color="#ffffff" />
            }
        </div>
    )
}

export default UserCard
