import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import acceptFriendRequest from '../../../../../api/acceptFriendRequest';
import updateUserFriend from '../../../../../redux/Auth/Actions/userFriend';
import updateShowBotomToast from '../../../../../redux/Auth/Actions/showBottomToast';
import socket from '../../../../../socket/socket';
import updateShowNotification from '../../../../../redux/Auth/Actions/showNotification';

const Accept = (props) => {

    const { rid } = props;

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.Auth.userDetails);

    const friends = useSelector(state => state.Auth.userFriend);

    const handleAcceptRequest = async () => {
        const response = await acceptFriendRequest(userDetails.id, rid, friends);
        console.log(response)
        if (!response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Something Went Wrong!!!' }));
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        else {
            dispatch(updateUserFriend(response.friends));
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Request Accepted' }));
            socket.emit("accept-request", { sid: userDetails.id, rid, username: userDetails.username, profile_photo: userDetails.profile_photo })
            dispatch(updateShowNotification({ show: false, type: '', data: {} }))
        }
    }

    return (
        <button
            onClick={handleAcceptRequest}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <span>Accept</span>
            <i className="fa-solid fa-circle-check ml-2"></i>
        </button>
    )
}

export default Accept
