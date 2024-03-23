import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import removeFriend from '../../../../../api/removeFriend';
import updateUserFriend from '../../../../../redux/Auth/Actions/userFriend';
import updateShowBotomToast from '../../../../../redux/Auth/Actions/showBottomToast';
import socket from '../../../../../socket/socket';

const Unfriend = (props) => {

    const { rid } = props;

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.Auth.userDetails)

    const friends = useSelector(state => state.Auth.userFriend);

    const handleRemoveFriend = async () => {
        const response = await removeFriend(userDetails.id, rid, friends);
        if (!response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Something Went Wrong!!!' }));
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        else {
            dispatch(updateUserFriend(response.friends));
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Successfully Removed' }));
            socket.emit("reject-request", { sid: userDetails.id, rid })
        }
    }

    return (
        <button
            onClick={handleRemoveFriend}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            <span>Unfriend</span>
            <i className="fa-solid fa-user-slash ml-2"></i>
        </button>
    )
}

export default Unfriend
