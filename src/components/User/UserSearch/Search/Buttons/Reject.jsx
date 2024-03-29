import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CancelIcon from '@mui/icons-material/Cancel';
import rejectFriendRequest from '../../../../../api/rejectFriendRequest';
import updateUserFriend from '../../../../../redux/Auth/Actions/userFriend';
import updateShowBotomToast from '../../../../../redux/Auth/Actions/showBottomToast';
import socket from '../../../../../socket/socket';
import updateShowNotification from '../../../../../redux/Auth/Actions/showNotification';

const Reject = (props) => {

    const { rid } = props;

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.Auth.userDetails)

    const friends = useSelector(state => state.Auth.userFriend);

    const handleRejectRequest = async () => {
        const response = await rejectFriendRequest(userDetails.id, rid, friends);
        console.log(response)
        if (!response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Something Went Wrong!!!' }));
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        else {
            dispatch(updateUserFriend(response.friends));
            dispatch(updateShowNotification({ show: false, type: '', data: {} }))
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Request Rejected' }));
            socket.emit("reject-request", { sid: userDetails.id, rid })
        }
    }

    return (
        <button
            onClick={handleRejectRequest}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <span>Reject</span>
            <CancelIcon htmlColor='white' className='ml-2' style={{ fontSize: '18px' }} />
        </button>
    )
}

export default Reject
