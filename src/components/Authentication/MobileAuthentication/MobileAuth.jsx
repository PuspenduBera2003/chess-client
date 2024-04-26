import React, { useEffect, useState } from 'react'
import './MobileAuth.css'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import MobileSignUp from './MobileSignUp'
import MobileSignIn from './MobileSignIn'

const MobileAuth = () => {

  const theme = useSelector(state => state.Theme.currentTheme);
  const { path } = useParams();
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      navigate('/auth/signin');
    } else {
      navigate('/auth/signup');
    }
  };

  useEffect(() => {
    if (path === 'signup') {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }

  }, [path]);

  return (
    <div className='w-full p-3'>
      <div className={`main ${theme === 'dark' ? 'bg-zinc-900' : 'bg-indigo-50'} border w-full m-3 rounded-lg shadow-lg`}>
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <MobileSignUp />
        <MobileSignIn />
      </div>
    </div>
  )
}

export default MobileAuth
