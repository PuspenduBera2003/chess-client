import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import currentFriend from '../../../../api/currentFriend'
import updateShowBotomToast from '../../../../redux/Auth/Actions/showBottomToast'
import FriendsSkeleton from './FriendsSkeleton'
import FriendIndividual from './FriendIndividual'

const Friends = () => {

    const userDetails = useSelector(state => state.Auth.userDetails);

    const dispatch = useDispatch();

    const [friends, setFriends] = useState(null);

    const skeletons = [1, 2, 3];

    useEffect(() => {
        const apiCall = async () => {
            setFriends(null)
            const response = await currentFriend(userDetails.id);
            if (response.success) {
                setFriends(response.friendData)
            } else {
                dispatch(updateShowBotomToast({ show: true, type: 'failure', message: response.error }));
            }
        }
        apiCall();
    }, [])

    return (
        <div className='mx-4 mb-6'>
            {
                !friends ?
                <div className='flex items-center justify-center gap-4 flex-wrap'>
                    {
                        skeletons.map((item) => (
                            <FriendsSkeleton key={item} />
                        ))
                    }
                </div>
                :
                <div className='flex items-center justify-center gap-4 flex-wrap'>
                    {
                        friends.map((item) => (
                            <FriendIndividual key={item.id} details={item} />
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Friends
