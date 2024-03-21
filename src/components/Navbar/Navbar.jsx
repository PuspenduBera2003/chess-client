import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar } from 'flowbite-react';
import NavbarMiddle from './NavbarMiddle'
import ProfileSection from './ProfileSection'
import NavbarLogo from './NavbarLogo'
import AuthenticationButton from './AuthenticationButton'
import './Navbar.css'
import Switcher from '../../theme/Switcher';

const NavigationBar = () => {

  const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);
  const currentTheme = useSelector(state => state.Theme.currentTheme);

  const gradientClasses = (currentTheme === "dark")
    ? 'from-stone-700 to-zinc-700'
    : 'bg-white';

  return (
    <Navbar fluid rounded className={`text-gray-900 bg-gradient-to-r ${gradientClasses} fixed top-0 start-0 w-full z-50 shadow-md shadow-stone-900 rounded-none`}>
      <NavbarLogo />
      <NavbarMiddle />
      <div className='hidden md:flex items-center justify-center gap-0.5 theme-changer'>
        <Switcher />
        {
          isAuthenticated ?
            <ProfileSection /> :
            <AuthenticationButton />
        }
      </div>
    </Navbar>
  )
}

export default NavigationBar
