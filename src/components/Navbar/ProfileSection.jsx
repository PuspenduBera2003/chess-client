import React from 'react'
import { Dropdown, Avatar } from 'flowbite-react'
import handleSignOut from '../../api/handleSignOut';
import { useSelector, useDispatch } from 'react-redux'
import updateIsAuthenticated from '../../redux/Auth/Actions/IsAuthenticated';
import { Link, useNavigate } from 'react-router-dom'
import updateShowBotomToast from '../../redux/Auth/Actions/showBottomToast';
import updateSignUpInitialized from '../../redux/Auth/Actions/signUpInitialized';
import socket from '../../socket/socket';

const ProfileSection = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector(state => state.Auth.userDetails);

  const handleSubmit = async () => {
    const sessionID = userDetails.sessionID;
    const signOut = await handleSignOut();
    if (signOut.success) {
      localStorage.setItem('isAuthenticated', false);
      dispatch(updateIsAuthenticated(false));
      dispatch(updateShowBotomToast({ show: true, type: 'success', message: 'Signed Out Sucessfully' }));
      dispatch(updateSignUpInitialized({
        start: false, response: {
          success: false,
          serverReplied: true
        }, email: '', username: '', password: '', token: ''
      }))
      navigate('/auth/signin');
    } else {
      dispatch(updateIsAuthenticated(false));
      dispatch(updateShowBotomToast({ show: true, type: 'failure', message: signOut.error }));
      navigate('/auth/signin');
      dispatch(updateSignUpInitialized({
        start: false, response: {
          success: false,
          serverReplied: true
        }, email: '', username: '', password: '', token: ''
      }))
    }
    socket.emit("logOut", { sessionID  });
  }

  return (
    <div className="flex md:order-2 items-center justify-center profile-image">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          userDetails.profile_photo ?
            <Avatar
              alt="User settings"
              img={userDetails.profile_photo}
              className='rounded-full ring-2 ring-gray-300 dark:ring-gray-500'
              rounded />
            :
            <div className="flex items-center">
              <svg className="text-gray-400 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
              </svg>
            </div>
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">
            {userDetails.username}
          </span>
          <span className="block truncate text-sm font-medium">
            {userDetails.email}
          </span>
        </Dropdown.Header>
        <Link to='/user/dashboard'>
          <Dropdown.Item>
            Dashboard
          </Dropdown.Item>
        </Link>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSubmit}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default ProfileSection
