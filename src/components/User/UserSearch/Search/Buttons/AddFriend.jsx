import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import addFriend from '../../../../../api/addFriend';
import updateUserFriend from '../../../../../redux/Auth/Actions/userFriend';
import updateShowBotomToast from '../../../../../redux/Auth/Actions/showBottomToast';
import socket from '../../../../../socket/socket';

const AddFriend = (props) => {

    const { rid } = props;

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.Auth.userDetails);

    const friends = useSelector(state => state.Auth.userFriend);


    const handleAddFriend = async () => {
        const response = await addFriend(userDetails.id, rid, userDetails.email, friends);
        if (!response.success) {
            dispatch(updateShowBotomToast({ show: true, type: 'failure', message: 'Something Went Wrong!!!' }));
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
        else {
            dispatch(updateUserFriend(response.friends));
            dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Friend Request Sent' }))
            socket.emit("add-friend", { sid: userDetails.id, rid: rid, susername: userDetails.username, sprofile_photo: userDetails.profile_photo })
        }
    }

    return (
        <button
            onClick={handleAddFriend}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <span>Add friend</span>
            <i className="fa-solid fa-user-plus ml-2"></i>
        </button>
    )
}

export default AddFriend
