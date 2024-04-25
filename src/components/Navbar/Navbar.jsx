import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar } from 'flowbite-react';
import NavbarMiddle from './NavbarMiddle'
import ProfileSection from './ProfileSection'
import NavbarLogo from './NavbarLogo'
import AuthenticationButton from './AuthenticationButton'
import './Navbar.css'
import Switcher from '../../theme/Switcher';
import logo from '../../static/images/logo.png'


const NavigationBar = () => {

  const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

  const userDetails = useSelector(state => state.Auth.userDetails);

  const currentTheme = useSelector(state => state.Theme.currentTheme);

  const invertFilter = (currentTheme === "dark") ? 'invert(1)' : 'invert(0)';

  const gradientClasses = (currentTheme === "dark")
    ? 'bg-gray-800'
    : 'bg-white';

  const location = useLocation();

  const currentPath = location.pathname;

  const isGameRoute = (currentPath.startsWith('/game/play-with-friends/') && currentPath.length > '/game/play-with-friends/'.length) || (currentPath.startsWith('/game/random-game/') && currentPath.length > '/game/random-game/'.length);

  return (
    <>
      {
        !isGameRoute ?
          (
            <Navbar fluid rounded className={`text-gray-900 ${gradientClasses} sticky top-0 start-0 w-full z-50 shadow-md shadow-stone-900 rounded-none`}>
              <NavbarLogo />
              <div className='flex flex-end items-end justify-end md:hidden mr-2' style={{ flexBasis: 1, flexGrow: 1 }}>
                <Switcher />
              </div>
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
          ) :
          (
            <div className={`text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-200 sticky top-0 start-0 w-full z-50 shadow-md shadow-stone-900 rounded-none flex flex-row flex-wrap items-center justify-between gap-6 px-2`} style={{ height: '3.75rem' }}>
              <div className='flex flex-row cursor-pointer'>
                <img
                  src={logo}
                  className="mr-1 h-6 sm:h-9"
                  alt="Chess Logo"
                  style={{ filter: invertFilter }}
                  loading='lazy'
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                  CHESSHUB
                </span>
              </div>
              <div className='flex flex-row gap-3 items-center justify-center'>
                <Switcher />
                {
                  (userDetails && userDetails.profile_photo) ?
                    <img src={userDetails.profile_photo} className='rounded-full ring-2 ring-gray-300 dark:ring-gray-500 w-12' alt={userDetails.username} />
                    : <div className="flex items-center rounded-full ring-2 ring-gray-300 dark:ring-gray-500">
                      <svg className="text-gray-400 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    </div>
                }
              </div>
            </div>
          )
      }
    </>
  )
}

export default NavigationBar
