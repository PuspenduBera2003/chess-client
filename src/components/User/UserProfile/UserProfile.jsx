import React from 'react'
import { useSelector } from 'react-redux'
import UploadProfilePhoto from './UploadProfilePhoto'

const UserProfile = () => {
    const currentTheme = useSelector(state => state.Theme.currentTheme)

    const userDetails = useSelector(state => state.Auth.userDetails)

    const userHomeClasses = (currentTheme === 'dark') ?
        'dark-user-right-panel' :
        'light-mode-feature-card'

    return (
        <section className={`user-right-panel border-l bg-gradient-to-r dark:border-gray-700 px-2 z-0 ${userHomeClasses}`}>
            <div className='flex items-center justify-center flex-col'>
                {
                    !userDetails.profile_photo ?
                        <div className='w-full flex items-center justify-center flex-col mb-3'>
                            <div className='dark:text-white text-2xl font-semibold p-4 text-center' style={{ width: '70%' }}>
                                Uh Oh!! Looks like your profile doesn't have a profile picture. Add a profile picture so that other users can recognize you.
                            </div>
                            <UploadProfilePhoto buttonName="Upload Profile Photo" />
                        </div>
                        :
                        <div className='w-full flex items-center justify-center flex-col mb-3'>
                            <img className="w-40 h-40 rounded-full mb-3" src={userDetails.profile_photo} alt={userDetails.username}></img>
                            <UploadProfilePhoto buttonName="Update Profile Photo" />
                        </div>
                }
                <form className="mx-auto mt-0">
                    <div className='flex items-center justify-center gap-3 w-96 flex-col'>
                        <label htmlFor="username" className='p-2 text-gray-900 dark:text-gray-100 font-bold'>
                            Username
                        </label>
                        <input type="text" id="username" aria-label="disabled input" className="mb-5 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userDetails.username} disabled />
                    </div>
                    <div className='flex items-center justify-center gap-3 w-96 flex-col'>
                        <label htmlFor="email" className='p-2 text-gray-900 dark:text-gray-100 font-bold'>
                            Email
                        </label>
                        <input type="text" id="email" aria-label="disabled input 2" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userDetails.email} disabled readOnly />
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UserProfile
